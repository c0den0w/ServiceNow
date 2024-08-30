var parser = new sn_impex.GlideExcelParser();

var attGR = new GlideRecord('sys_attachment');
attGR.addQuery('table_sys_id', '7a8c708183c7821032fba530ceaad323'); //sys_id of the current fix script record 
attGR.query();

if (attGR.next()) {

    var attachment = new GlideSysAttachment();
    var attachmentStream = attachment.getContentStream(attGR.sys_id);
    parser.setSheetNumber(0);
    parser.setNullToEmpty(true);
    parser.parse(attachmentStream);
    while (parser.next()) {
        var row = parser.getRow();
        // row["Conditions"] - gets the conditions value starting from first row

		// Your script follows
        var a = new GlideRecord('sn_shn_notes');
        a.addEncodedQuery(row["Conditions"]);
        a.query();
        gs.print(a.getRowCount());
        while (a.next()) {
            a.setValue('display_type', 'true');
            a.setValue('status', '1');
            a.setValue('table_name', 'sys_user');
            a.setValue('type', '2');
            a.setValue('conditions', row["Conditions"]);
            a.setWorkflow(false); // Do not run business rules
            a.autoSysFields(false); // Do not update system fields
            a.update();
        }
    }
}
