(function () {

    angular.module('mod-query-edit')
        .factory("formMaker", function() {
            return {
                getServiceFields: function() {
                    return {
                        "fields": [
                        {
                            "name": "tableName",
                            "type": "select",
                            "label": "表名:",
                            "candidates": [
                                {
                                    "name": "rtapam_dim_trans",
                                    "value": "rtapam_dim_trans"
                                },
                                {
                                    "name": "rtapam_dim_trans2",
                                    "value": "rtapam_dim_trans2"
                                }
                            ]
                        },
                        {
                            "name": "dim",
                            "type": "button",
                            "label": "统计维度:",
                            "buttonName": "配置"
                        },
                        {
                            "name": "business",
                            "type": "button",
                            "label": "业务:",
                            "buttonName": "配置"
                        },
                        {
                            "name": "statistic",
                            "type": "button",
                            "label": "统计指标:",
                            "buttonName": "配置"
                        }, {
                            "type": "input:submit",
                            "value": "查询"
                        }
                    ],
                        "option": {
                        "formClass": "form-horizontal",
                            "labelClass": "col-xs-4",
                            "inputClass": "col-xs-7"
                    }

                    }
                }
            }
        })

})()

