(function () {

    angular.module('mod-query-edit')
        .controller("queryEditCtrl", function(formMaker) {
            this.form = formMaker.getServiceFields();
            this.submit = function(valid, result) {
                valid && (console.info(result))
            }
            this.click = function(field) {

            }
        })

})()

