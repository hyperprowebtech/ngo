<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Account Overview</h3>
                <?php
                // if(isset($isStudent)){
                //     echo '<div class="card-toolbar">';
                //     echo $this->ki_theme
                //                 ->with_icon('setting-2')
                //                 ->with_pulse('primary')
                //                 ->outline_dashed_style('primary')
                //                 ->add_action('Setting','student/profile/setting');
                //     echo '</div>';
                // }
                ?>
            </div>
            <div class="card-body p-0">
                <table class="table table-bordered">
                    <tr>
                        <th>Mobile</th>
                        <td><a href="tel:{contact_number}">{contact_number}</a> <label class="badge badge-info text-capitalize">{contact_no_type}</label></td>
                        <th>Email</th>
                        <td><a href="mailto:{email}">{email}</a></td>
                    </tr>
                    <tr>
                        <th>Father Name</th>
                        <td>{father_name}</td>
                        <th>Mother Name</th>
                        <td>{mother_name}</td>
                    </tr>
                    <tr>
                        <th>State Name</th>
                        <td>{STATE_NAME}</td>
                        <th>City Name</th>
                        <td>{DISTRICT_NAME}</td>
                    </tr>
                    <tr>
                        <th>Address</th>
                        <td>{address}</td>
                        <th>Pincode</th>
                        <td>{pincode}</td>
                    </tr>   

                </table>
            </div>
        </div>
    </div>
</div>