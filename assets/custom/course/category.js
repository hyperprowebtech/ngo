document.addEventListener('DOMContentLoaded', function (e) {
    const delete_url = 'course/delete-category';
    const form = document.getElementById('add_course_category');
    const list_url = 'course/list-category';
    const save_url = 'course/add-category';
    const table = $('#category_list');
    const columns = [
        { 'data': 'title' },
        { 'data': null }
    ];
    // var dt = '';
    if (table.length) {
        const dt = table.DataTable({
            dom: small_dom,
            buttons: [],
            ajax: {
                url: ajax_url + list_url,
                success: function (d) {
                    // console.log(d);
                    if (d.data && d.data.length) {
                        dt.clear();
                        dt.rows.add(d.data).draw();
                    }
                    else {
                        toastr.error('Table Data Not Found.');
                        DataTableEmptyMessage(table);
                    }
                },
                error: function (a, b, v) {
                    console.warn(a.responseText);
                }
            },
            columns: columns,
            columnDefs: [
                {
                    targets: -1,
                    data: null,
                    orderable: false,
                    className: 'text-end',
                    render: function (data, type, row) {
                        // console.log(data);
                        return `<div class="btn-group">
                                    <buttons class="btn btn-primary btn-sm edit-record"><i class="fa fa-edit"></i> Edit</buttons>
                                    ${deleteBtnRender(0, row.id)}
                                </div>
                                `;
                    }
                }
            ]
        });
        dt.on('draw', function (e) {
            EditForm(table, 'course/edit-category', 'Edit Category');
            const handle = handleDeleteRows(delete_url);
            handle.done(function (e) {
                // console.log(e);
                table.DataTable().ajax.reload();
            });
        });


    }
    if (form) {
        var validation = MyFormValidation(form);
        validation.addField('title', {
            validators: {
                notEmpty: { message: 'Enter A Valid Category Name' }
            }
        })
        form.addEventListener('submit', function (e) {
            // Prevent default button action
            e.preventDefault();
            $.AryaAjax({
                url: save_url,
                data : new FormData(e.target),
                validation : validation
            }).then((res) => showResponseError(res));
        });
    }
});
