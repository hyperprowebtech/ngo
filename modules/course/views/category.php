<div class="row">
    <div class="col-md-5">
        <form id="add_course_category">
            <div class="{card_class}">
                <div class="card-header collapsible cursor-pointer rotate" data-bs-toggle="collapse"
                    data-bs-target="#kt_docs_card_collapsible">
                    <h3 class="card-title">Add Course Category</h3>
                </div>
                <div id="kt_docs_card_collapsible" class="collapse show">
                    <div class="card-body">
                        <div class="form-group">
                            <label class="form-label required">Enter Title</label>
                            <input type="text" name="title" class="form-control" placeholder="Enter Title">
                        </div>
                    </div>
                    <div class="card-footer  pb-5">
                        {publish_button}
                    </div>
                </div>
            </div>
        </form>
    </div>
    <div class="col-md-7">
        <div class="{card_class}">
            <div class="card-header collapsible cursor-pointer rotate" data-bs-toggle="collapse" data-bs-target="#list">
                <h3 class="card-title">List Batch</h3>
            </div>
            <div id="list" class="collapse show">
                <div class="card-body p-0">

                    <div class="table-responsive">
                        <!--begin::Datatable-->
                        <table id="category_list" class="table align-middle table-row-dashed fs-6">
                            <thead>
                                <tr class="text-start text-gray-500 fw-bold fs-7 text-uppercase gs-0">

                                    <th>Category</th>
                                    <th class="text-end min-w-100px">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="text-gray-600 fw-semibold">
                            </tbody>
                        </table>
                        <!--end::Datatable-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script id="formTemplate" type="text/x-handlebars-template">
    <input type="hidden" name="id" value="{{id}}">
    <div class="form-group">
        <label for="" class="form-label">Category Title</label>
        <input type="text" class="form-control" name="title" placeholder="enter Name" value="{{title}}">
    </div>
</script>