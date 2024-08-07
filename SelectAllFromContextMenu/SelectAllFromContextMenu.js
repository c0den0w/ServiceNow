runAction();

function runAction() {
    var ga = new GlideAjax("ContextMenuUtils");   //Creating an instance of the script include and calling the method
    ga.addParam("sysparm_name", "getValues");     //name of the method to call
    ga.addParam("sysparm_table_name", g_list.getTableName());  //required parameter
    ga.addParam("sysparm_field_name", g_fieldName);    //required parameter
    ga.addParam("sysparm_encoded_query", g_list.getQuery());     //required parameter
    ga.getXMLAnswer(callback);    //Makes an asynchronous call to the server. On completion callback is invoked

    //callback function will have a response argument of type any 
    function callback(response) {
        var res = JSON.parse(response);

        var parsedRes = res.result.join("\n");  //converts array to a string separated by a newline character (for copying)
        navigator.clipboard.writeText(parsedRes);   //native JS browser method to copy to clipboard
        if (response) {
            //alert to notify the user that values are copied
            alert(res.rows + " value(s) copied to clipboard");           
        }
    }
}