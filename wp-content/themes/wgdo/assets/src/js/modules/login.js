var Modal = require('./modal');

var Login = {

    /**
     * Load login form in Ajax
     * @param link [jQuery element] => Link to init from (with its 'href' attribute)
     * @param url [string] => URL to load datas from
     * @param redirectUrl [string] => URL to redirect user after request success
     */
    loadForm: function (link, url, redirectUrl) {
        var $loginBtn = $(link),
            loginURL = (url) ? url : $loginBtn.attr('href'),
            redirectURL = (redirectUrl) ? redirectUrl : loginURL,
            isLogged = $('body').is('.logged-in');


        $loginBtn.click(function (e) {
            var $btn = $(this);

            /**
             * - Check for already logged-in users
             * - Prevent redirect by clicking on the link
             * - jQuery load() the form element on the target URL, then request Modal.create() method, to append content into a new modal
             * - Call self submitForm() method when user submits form
             */
            if (isLogged == false) {
                e.preventDefault();
                $btn.attr('data-loading', true); // CSS purpose

                var loginModalClass = 'gu-Modal-login';

                /**
                 * Check for already existing modal with this class,
                 * in order to just show it instead of requesting again
                 */
                if ($('.'+ loginModalClass).length) {
                    Modal.show('.'+ loginModalClass);
                    Login.submitForm('#gu-Login-form', redirectURL);
                }
                else {
                    var $loginForm = $('<div />');

	                Modal.create($loginForm, loginModalClass);
                    $loginForm.load(loginURL +' #gu-Login-authentification', function () {
                        $btn.attr('data-loading', false);
                        $('body').trigger('ModalLoaded');

                        Login.submitForm('#gu-Login-form', redirectURL);
                    });
                }
            }
        });
    },

    /**
     * Ajax Login
     * @param form [string] => class/ID/etc. of the form to submit
     * @param UrlToRedirect [string] => URL to redirect user to after logging in
     */
    submitForm: function (form, UrlToRedirect) {
        var form = form;

        $(form).submit(function(e) {
            e.preventDefault();

            var $form = $(this);
            var datas = $form.serialize();
            var action = $form.attr('action');

            $form.attr("data-sending", true);

            $.post(action, datas, function(data) {
                /**
                 * Check for Wordpress login error and displays them
                 */
                if ($(data).find('#login_error').length) {
                    var $errorMsg = $(data).find('#login_error'),
                        $errorContainer = ($('.gu-Login-error').length) ? $('.gu-Login-error') : $('<div class="gu-Login-error" />');

                    $errorContainer.html('').prepend($errorMsg);
                    $form.prepend($errorContainer);
                } else {
                    /**
                     * Redirects user to URL once logged in
                     */
                    window.location.href = UrlToRedirect;
                }
            });
        });
    }
}

module.exports = Login;
