var ContextMenuUtils = Class.create();
ContextMenuUtils.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    getValues: function() {
        var table = this.getParameter("sysparm_table_name");
        var field = this.getParameter("sysparm_field_name");
        var encodedQuery = this.getParameter("sysparm_encoded_query");
        var resultArray = [];
        var gr = new GlideRecord(table);
        var count = 0;
        if (encodedQuery) {
            gr.addEncodedQuery(encodedQuery);
            gr.query();
        } else {
            gr.query();
        }
        while (gr.next()) {
            count += 1;
            if (gr.getValue(field)) {
                resultArray.push(gr.getValue(field));
            }
        }
        if (resultArray) return JSON.stringify({
            "result": resultArray,
            "rows": count
        });
    },

    displayInfoMessage: function() {
        gs.addInfoMessage("Copied");
        g_form.addInfoMessage("copied");
        return "";
    },
    type: 'ContextMenuUtils'
});