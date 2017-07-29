var Forms = {

    /**
     * Forms 'Select' manager
     * Transforms 'selects' as normal list to customize them easily
     */
    selects: function () {

        $('select').each(function () {
            var $this = $(this),
                numberOfOptions = $(this).children('option').length,
                activeOptionClass = 'is-Active';
            
            /**
             * Add CSS class to hide the 'select' tag.
             * Create the list wrapper ('.gu-Form-select__wrapper')
             */
            $this.addClass('is-Hidden'); 
            $this.wrap('<div class="gu-Form-select__wrapper"></div>');
            $this.after('<div class="gu-Form-select__selected"></div>');

            var $styledSelect = $this.next('.gu-Form-select__selected');
            
            /**
             * If an option is already selected (has 'selected' property), displays it as the selected option
             * Otherwise, displays the first option by default.
             */
            if ( $this.find('option[selected]').length ) {
                var selectedOptionValue = $this.children('option[selected]').val();

                $styledSelect.text($this.children('option[selected]').text());
            }
            else {
                $styledSelect.text($this.children('option').eq(0).text());
            }
            
            var $list = $('<ul />', { 'class': 'gu-Form-select__options' }).insertAfter($styledSelect);
            
            /**
             * Append each 'option' value to a new 'li' tag inside the list
             */
            for (var i = 0; i < numberOfOptions; i++) {
                $('<li />', {
                    text: $this.children('option').eq(i).text(),
                    rel: $this.children('option').eq(i).val()
                }).appendTo($list);
            }
        
            var $listItems = $list.children('li');
            
            /**
             * Add 'data-active-option' attribute to the current language
             */
            $listItems.each(function () {
                if (typeof selectedOptionValue !== 'undefined' && $(this).attr('rel') == selectedOptionValue) {
                    $(this).attr('data-active-option', '');
                }
                else if (typeof selectedOptionValue == 'undefined') {
                    console.error('Il n\'y a pas de langue sélectionnée : la variable "selectedOptionValue" n\'existe pas');
                }
            });

            /**
             * Events listeners
             */
            $styledSelect.click(function(e) {
                e.stopPropagation();
                $('.gu-Form-select__selected.'+ activeOptionClass).not(this).each(function(){
                    $(this).removeClass(activeOptionClass).next('.gu-Form-select__options').hide();
                });
                $(this).toggleClass(activeOptionClass).next('.gu-Form-select__options').toggle();
            });
        
            $listItems.click(function(e) {
                e.stopPropagation();
                $styledSelect.text($(this).text()).removeClass(activeOptionClass);
                $this.val($(this).attr('rel'));
                $list.hide();

                /**
                 * Checks if Polylang Wordpress plugin's 'urls_polylang2' (object) variable is already initialized in the document
                 * If it is, copies its logic: change window location depending of the selected language
                 */
                if (typeof urls_polylang2 !== 'undefined' || typeof urls_polylang2 !== null) {
                    location.href = urls_polylang2[$(this).attr('rel')];
                }
                else {
                    console.error('La variable "urls_polylang2" n\'est pas définie')
                }
            });
            
            /**
             * Hide select list when clicking on the document
             */
            $(document).click(function() {
                $styledSelect.removeClass(activeOptionClass);
                $list.hide();
            });

        });
    },


    /**
     * Search form manager
     */
    searchForm: function () {
        var $form = $('#gu-search'),
            $formWrapper = $('.gu-Search__wrapper'),
            $formToggler = $('.gu-Search__toggler'),
            toggleAttr = 'data-toggled';

        /**
         * Hide / Show form functions (manage display with 'data-toggled' attribute)
         */
        function showSearch () {
            $formWrapper.attr(toggleAttr, true);
            $formToggler.attr(toggleAttr, true);
            $('body').attr('data-no-scroll', '');
            $formWrapper.find('.gu-Search__input').focus();
        }

        function hideSearch () {
            $formWrapper.attr(toggleAttr, false);
            $formToggler.attr(toggleAttr, false);
            $('body').removeAttr('data-no-scroll');
        }

        /**
         * Toggle form by clicking on the button
         */
        $formToggler.click(function () {
            if ($formWrapper.attr(toggleAttr) == "false") {
                showSearch();
            }
            else {
                hideSearch();
            }
        });

        /**
         * Hide Form when clicking on document (but not on form)
         */
        $form.click(function (e) {
            e.stopPropagation();
        });

        $('.gu-Search__wrapper').click(function () {
            hideSearch();
        });
        

        /**
         * Hide form when pressing 'Escape' key
         */
        $(document).keyup(function(e) {
            if (e.keyCode == 27 && $formWrapper.attr(toggleAttr) == "true") {
                hideSearch()
            }
        });

    },


    /**
     * Newsletter form
     */
    newsletterForm: function () {
        var $widget = $('.widget_newsletterwidgetminimal'),
            $formField = $widget.find('.tnp-email');

        $formField.click(function () {
            $widget.addClass('is-Focused');
        });

        if ($formField.val() !== '') {
            $widget.addClass('is-Focused');
        }
    },
}

module.exports = Forms;