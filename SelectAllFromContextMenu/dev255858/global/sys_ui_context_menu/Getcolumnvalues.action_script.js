
runAction();

function runAction() {
    var ga = new GlideAjax("ContextMenuUtils");
    ga.addParam("sysparm_name", "getValues");
    ga.addParam("sysparm_table_name", g_list.getTableName());
    ga.addParam("sysparm_field_name", g_fieldName);
    ga.addParam("sysparm_encoded_query", g_list.getQuery());
    ga.getXMLAnswer(callback);


    function callback(response) {
        var res = JSON.parse(response);

        var parsedRes = res.result.join("\n");
        navigator.clipboard.writeText(parsedRes);

        if (response) {
            var gm = new GlideModal("CopiedToClipboard");
            //Sets the dialog title
            gm.setTitle('Info');
            gm.setWidth(550);
            gm.renderWithContent("<div style='font-size:16px;font-weight:600;color:#3388dd;'>Copied " + res.rows + " value(s) </div>");
        }
    }
}