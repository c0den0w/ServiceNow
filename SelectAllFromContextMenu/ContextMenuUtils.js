//Client callable script include
var ContextMenuUtils = Class.create();
ContextMenuUtils.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    getValues: function() {
        var table = this.getParameter("sysparm_table_name");
        var field = this.getParameter("sysparm_field_name");
        var encodedQuery = this.getParameter("sysparm_encoded_query");
        var resultArray = [];
        var gr = new GlideRecord(table);
        var count = 0; //this variable counts the number of rows returned

        //if condition in case a filter condition is added to the list
        if (encodedQuery) {
            gr.addEncodedQuery(encodedQuery);
            gr.query();
        } else {
            gr.query();
        }
        while (gr.next()) {
            count += 1;     //counting
            if (gr.getValue(field)) {
                resultArray.push(gr.getValue(field));   //gets the value of the selected field and pushes it to an array declared earlier
            }
        }
        if (resultArray) return JSON.stringify({
            "result": resultArray,
            "rows": count
        });
    },
    type: 'ContextMenuUtils'
});