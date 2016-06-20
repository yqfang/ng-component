(function () {

    angular.module('mod-query-edit')
    	.filter('propsFilter', function() {
		  return function(items, props) {
		    var out = [];

		    if (angular.isArray(items)) {
		      var keys = Object.keys(props);
		        
		      items.forEach(function(item) {
		        var itemMatches = false;

		        for (var i = 0; i < keys.length; i++) {
		          var prop = keys[i];
		          var text = props[prop].toLowerCase();
		          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
		            itemMatches = true;
		            break;
		          }
		        }

		        if (itemMatches) {
		          out.push(item);
		        }
		      });
		    } else {
		      // Let the output be the input untouched
		      out = items;
		    }

		    return out;
		  };
		})
        .controller("queryEditCtrl", function(formMaker) {
            this.editorConfig = {lineNumbers: true,mode: "text/x-mariadb",theme: "twilight"};
            this.sqlContent = "";
            this.buttons = [
	            {
	            	title: "提交",style: "primary",onclick: function(){
						submit().then(function(){
							search();
						})
					}
				},
				{
					title: "另存为",style: "success",onclick: function(){
						$http.post("newstore",{"storeContent": service.sqlContent},{uni_obj: true}).then(function(data){
							console.log(data);
						})
					}
				},
				{
					title: "预览",style: "warning",onclick: function(){

					}
				},
				{
					title: "新查询",style: "info",onclick: function(button){reset()

					}
				}
			];
			this.people = [
			    { name: 'Adam',      email: 'adam@email.com',      age: 12, country: 'United States' },
			    { name: 'Amalie',    email: 'amalie@email.com',    age: 12, country: 'Argentina' },
			    { name: 'Estefanía', email: 'estefania@email.com', age: 21, country: 'Argentina' },
			    { name: 'Adrian',    email: 'adrian@email.com',    age: 21, country: 'Ecuador' },
			    { name: 'Wladimir',  email: 'wladimir@email.com',  age: 30, country: 'Ecuador' },
			    { name: 'Samantha',  email: 'samantha@email.com',  age: 30, country: 'United States' },
			    { name: 'Nicole',    email: 'nicole@email.com',    age: 43, country: 'Colombia' },
			    { name: 'Natasha',   email: 'natasha@email.com',   age: 54, country: 'Ecuador' },
			    { name: 'Michael',   email: 'michael@email.com',   age: 15, country: 'Colombia' },
			    { name: 'Nicolás',   email: 'nicolas@email.com',    age: 43, country: 'Colombia' }
			  ];
			this.multipleDemo = {};
  			this.multipleDemo.selectedPeopleWithGroupBy = [this.people[8], this.people[6]];
	    })

})()

