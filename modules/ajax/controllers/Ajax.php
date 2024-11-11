<?php
class Ajax extends Ajax_Controller
{

    function generate_link()
    {
        $allLinks = $this->ki_theme->project_config('open_links');
        if (isset($allLinks[$this->post('type')])) {
            $this->response('link', base_url($allLinks[$this->post('type')] . '/' . $this->encode($this->post('id'))));
            $this->response('status', true);
        }
        $this->response($this->post());
    }
    function register()
    {
        $this->db->insert('demo_query', $this->post());
        try {
            $this->set_data($this->post());
            $this->do_email('hyperprowebtech@gmail.com', 'New Demo Checklist', $this->template('email/demo-query'));
        } catch (Exception $e) {

        }
        $this->response('status', true);
        $this->response('html', 'Thankyou..');
    }
    function deleted()
    {
        $this->response(
            'status',
            $this->db->where($this->post('field'), $this->post('field_value'))->update($this->post('table_name'), [
                'isDeleted' => 1
            ])
        );
    }
    function undeleted()
    {
        $this->response(
            'status',
            $this->db->where($this->post('field'), $this->post('field_value'))->update($this->post('table_name'), [
                'isDeleted' => 0
            ])
        );
    }
    function admin_login()
    {
        $email = $this->input->post('username');
        $password = sha1($this->input->post('password'));
        try {
            $table = $this->db->where('username', $email)->get('login');
            if ($table->num_rows()) {

                $row = $table->row();
                if (($row->status && $row->type == 'main')) {
                    if ($row->password == $password) {
                        $this->load->library('session');
                        $this->session->set_userdata([
                            'admin_login' => true,
                            'admin_type' => $row->type,
                            'admin_id' => $row->id
                        ]);
                        $this->response('status', 1);
                    } else
                        $this->response('error', alert('Sorry, the username or password is incorrect, please try again.', 'danger'));
                } else
                    $this->response('error', alert('Your Account is In-active. Please Contact Your Admin', 'danger'));
            } else
                throw new Exception(alert('Sorry, this username  is not found..', 'danger'));
        } catch (Exception $e) {
            $this->response('error', $e->getMessage());
        }
    }
    function delete_enquiry($id)
    {
        $this->response('status', $this->db->where('id', $id)->delete('contact_us_action'));
    }
    function upload_file()
    {
        if ($this->file_up('image'))
            $this->response('status', true);
    }

    function centre_wallet_load()
    {
        $post = $this->post();
        $closing_balance = ($post['amount'] + $post['closing_balance']);
        $data = [
            'center_id' => $post['centre_id'],
            'amount' => $post['amount'],
            'o_balance' => $post['closing_balance'],
            'c_balance' => $closing_balance,
            'type' => 'wallet_load',
            'description' => $post['description'],
            'added_by' => 'admin',
            'order_id' => strtolower(generateCouponCode(12)),
            'status' => 1,
            'wallet_status' => 'credit'
        ];
        $this->db->insert('wallet_transcations', $data);
        $this->center_model->update_wallet($post['centre_id'], $closing_balance);
        $this->response('status', true);
    }
}