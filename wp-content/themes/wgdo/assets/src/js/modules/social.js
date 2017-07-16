var Social = {

    /**
     * Init Social networks modal (for QRCode scan purpose)
     */
    networkModal: function () {
        var $networksWidget = $('.gu-Footer-social__networks'),
            $itemsWithModal = $networksWidget.find('[data-network-hasmodal]'),
            activeClass = 'is-Active';

        $itemsWithModal.each(function () {
            var $item = $(this);

            $item.find('a').click(function (e) {
                e.preventDefault();

                // Show or hide modal
                if ($item.is('.'+ activeClass)) {
                    $item.removeClass(activeClass);
                }
                else {
                    $itemsWithModal.removeClass(activeClass);
                    $item.addClass(activeClass);
                }
            });

            drawModal($item, $item.data('options'));
        });

        /**
         * Draw social network modal
         * @param {*} item = List item (jQuery element)
         * @param {*} options = Modal options in HTML attribute (JSON)
         */
        function drawModal (item, options) {
            if (item && options) {
                var $item = item,
                    modalOptions = options;

                // Draw Modal if options exist
                if (modalOptions.account && modalOptions.qrcode) {
                    var $modal = $('<div class="gu-Footer-social__modal">');
                    $modal.append('<strong>@'+ modalOptions.account +'</strong>');
                    $modal.append('<img src="'+ modalOptions.qrcode +'" alt="'+ modalOptions.account +'" />');

                    // Append modal to item
                    $modal.appendTo($item);
                }
            }
        }
    },


}

module.exports = Social;