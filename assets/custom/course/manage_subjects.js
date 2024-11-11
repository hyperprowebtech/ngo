document.addEventListener('DOMContentLoaded', function (e) {

    const subject_type = $('input[name="subject_type"]');
    const add_form = document.getElementById('subject_add');
    const list_subjects = $('#list-subjects');
    const delete_list_subjects = $('#deleted-list-subjects');
    // console.log(add_form);
    if (add_form) {
        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        var validator = FormValidation.formValidation(
            add_form,
            {
                fields: {
                    course_id: {
                        validators: {
                            notEmpty: {
                                message: "Select a course"
                            }
                        }
                    },
                    duration: {
                        validators: {
                            notEmpty: {
                                message: 'Select a duration'
                            }
                        }
                    },
                    subject_name: {
                        validators: {
                            notEmpty: {
                                message: 'Subject Name is required'
                            }
                        }
                    },
                    subject_code: {
                        validators: {
                            notEmpty: {
                                message: 'Subject Code is required'
                            }
                        }
                    }

                },


                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    submitButton: new FormValidation.plugins.SubmitButton(),
                    message: new FormValidation.plugins.Message({
                        container: function (field, element) {
                            // Append error message after the form field

                            return element.parentElement;
                        }
                    }),
                }
            }
        );

        add_form.addEventListener('submit', function (e) {
            // Prevent default button action
            e.preventDefault();
            var submitButton = $(this).find('button');

            // Validate form before submit
            if (validator) {
                // console.log(validator);
                validator.validate().then(function (status) {
                    // console.log(validator);
                    var formData = new FormData(add_form);

                    if (status == 'Valid') {
                        $(submitButton).attr('data-kt-indicator', 'on').prop('disabled', true);
                        $.AryaAjax({
                            url: 'course/add-subject',
                            data: new FormData(add_form),
                            success_message: "Subject Submited Successfully."
                        }).then(res => {
                            if (res.status)
                                list_subjects.DataTable().ajax.reload();
                            showResponseError(res)
                        });

                    }
                });
            }
        });
    }

    if (list_subjects) {
        var index = 1;
        var dt = list_subjects.DataTable({
            dom: small_dom,
            ajax: {
                url: ajax_url + 'course/list-subjects',

                success: function (d) {
                    // console.log(d);
                    if (d.data && d.data.length) {
                        dt.clear();
                        dt.rows.add(d.data).draw();
                    }
                    else {
                        toastr.error('Table Data Not Found.');
                        DataTableEmptyMessage(list_subjects);
                        SwalWarning('Notice', `                        Subjects not Found..                    `)
                    }
                },
                'error': function (xhr, error, thrown) {
                    // Custom error handling
                    console.log('DataTables Error:', xhr, error, thrown);

                    // Show an alert or a custom message
                    alert('An error occurred while loading data. Please try again.');
                }

            },
            columns: [
                { 'data': null },
                { 'data': 'subject_code' },
                { 'data': 'subject_name' },
                { 'data': 'course_name' },
                { 'data': 'theory_min_marks' },
                { 'data': 'theory_max_marks' },
                { 'data': 'practical_min_marks' },
                { 'data': 'practical_max_marks' },
                { 'data': null },
            ],
            columnDefs: [
                {
                    targets: 0,
                    render: function (data, type, row, meta) {
                        // console.log(row);
                        return `${meta.row + 1}.`;
                    }
                },
                {
                    targets: 3,
                    render: function (data, type, row) {
                        var badgeClass = duration_badge(row.duration_type, duration_colors);//) ? duration_colors[row.duration_type] : 'danger';
                        var myduration = `<lable class="badge badge-${badgeClass}"> ${course_duration_humnize_without_ordinal(row.subject_duration, row.duration_type)}</lable>`;//row.duration+ ` </>`;

                        return `${data} &nbsp; ${myduration}`;
                    }
                },
                {
                    targets: -1,
                    render: function (data, type, row) {
                        delete row.id;
                        row.id = row.subject_id;
                        return `
                                <button class="btn btn-sm btn-info edit-record">
                                    <i class="fa fa-edit"></i>
                                </button>
                                <button class="btn btn-sm btn-danger delete-subject" data-id="${row.subject_id}">
                                    <i class="fa fa-trash"></i>
                                </button>`;
                    }
                }
            ]
        });
        dt.on('draw', function (e) {
            index = 1;
            list_subjects.EditForm('course/edit-subject', 'Edit Subject');
        })
        $(document).on('click', '.delete-subject', function () {
            var id = $(this).data('id');
            SwalWarning('Confirmation', 'Are you sure for delete this subject', true, 'Delete').then((e) => {
                if (e.isConfirmed) {
                    $.AryaAjax({
                        url: 'course/subject-delete',
                        data: { id },
                        success_message: 'Suject Deleted Successfully..'
                    }).then((f) => {
                        if (f.status) {
                            list_subjects.DataTable().ajax.reload();
                            delete_list_subjects.DataTable().ajax.reload();
                        }
                        showResponseError(f);
                    });
                }
                else {
                    toastr.warning('Request Aborted');
                }
            })

        });
    }

    if (delete_list_subjects) {
        var index = 1;
        var ddt = delete_list_subjects.DataTable({
            dom: small_dom,
            ajax: {
                url: ajax_url + 'course/list-deleted-subjects'
            },
            columns: [
                { 'data': null },
                { 'data': 'subject_code' },
                { 'data': 'subject_name' },
                { 'data': 'course_name' },
                { 'data': 'theory_min_marks' },
                { 'data': 'theory_max_marks' },
                { 'data': 'practical_min_marks' },
                { 'data': 'practical_max_marks' },
                { 'data': null },
            ],
            columnDefs: [
                {
                    target: 0,
                    render: function (data, type, row, meta) {
                        return `${meta.row + 1}.`;
                    }
                },
                {
                    targets: 3,
                    render: function (data, type, row) {
                        var badgeClass = duration_badge(row.duration_type, duration_colors);//) ? duration_colors[row.duration_type] : 'danger';
                        var myduration = `<lable class="badge badge-${badgeClass}"> ${course_duration_humnize_without_ordinal(row.subject_duration, row.duration_type)}</lable>`;//row.duration+ ` </>`;

                        return `${data} &nbsp; ${myduration}`;
                    }
                },
                {
                    targets: -1,
                    render: function (data, type, row) {
                        delete row.id;
                        row.id = row.subject_id;
                        return `<div class="btn-group">                                
                                <button class="btn btn-sm btn-light-primary undelete-btn">
                                    <i class="fa fa-arrow-left"></i> Move to list
                                </button>
                                <button data-id="${row.subject_id}" class="btn btn-sm btn-light-danger parma-delete-subject">
                                    <i class="fa fa-trash"></i> Delete
                                </button>
                            </div>`;
                    }
                }
            ]
        });
        ddt.on('draw', function (r) {
            delete_list_subjects.unDeleteEvent('subjects', 'Subject', 'subject_id');
        })
        $(document).on('click', '.parma-delete-subject', function () {
            var id = $(this).data('id');
            SwalWarning('Confirmation', 'Are you sure for delete this subject', true, 'Delete').then((e) => {
                if (e.isConfirmed) {
                    $.AryaAjax({
                        url: 'course/parma-subject-delete',
                        data: { id },
                        success_message: 'Suject Deleted Successfully..'
                    }).then((f) => {
                        if (f.status) {
                            delete_list_subjects.DataTable().ajax.reload();
                        }
                        showResponseError(f);
                    });
                }
                else {
                    toastr.warning('Request Aborted');
                }
            })
        });
    }

    subject_type.on('change', function () {
        var divclass = (this.value);
        $('.both_box').slideUp('fast');

        $('.' + divclass + '_box').slideDown('fast')
        $('.' + divclass + '_box').find('input:eq(1)').focus();
    });

});