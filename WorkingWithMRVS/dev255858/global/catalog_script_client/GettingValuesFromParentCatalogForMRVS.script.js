function onLoad() {
    //Type appropriate comment here, and begin script below
    try {
        var mrvsValues = g_service_catalog.parent.getValue("mrvs");
        var arrMrvsValues = [];
        var mrvsSysIds = [];
        var value = g_service_catalog.parent.getValue("friends");
        var arrValue = value.split(",");
		g_form.addInfoMessage("Number of values in form: " + arrValue.length);
        var mappedArray = [];
        var log = '';
        if (mrvsValues) {
            arrMrvsValues = JSON.parse(mrvsValues); //needs to be done here only
            // gets the mrvs sys ids
            for (var i = 0; i < arrMrvsValues.length; i++) {
                mrvsSysIds.push(arrMrvsValues[i]["selected_friends"]);
            }
            // alert("mrvsSysIds " + mrvsSysIds);
            for (var j = 0; j < arrValue.length; j++) {
                if (mrvsSysIds.indexOf(arrValue[j]) == -1) {
                    mappedArray.push(arrValue[j]);
                }
            }
            // alert(mappedArray);
            var ga1 = new GlideAjax("MRVSUtils");
            ga1.addParam("sysparm_name", "getManagerInfo");
            ga1.addParam("sysparm_id", mappedArray.join(","));
            ga1.getXMLAnswer(ga1calls);
        } else {
            var ga2 = new GlideAjax("MRVSUtils");
            ga2.addParam("sysparm_name", "getManagerInfo");
            ga2.addParam("sysparm_id", value);
            ga2.getXMLAnswer(ga2calls);
        }
    } catch (err) {
        g_form.setValue("how_are_you_feeling", err);
    }
    var selectedValues = [];

    function ga1calls(response) {
        var res = JSON.parse(response);
        for (var i = 0; i < res.length; i++) {
            selectedValues.push(mappedArray[i]);  //keeps the mrvs form alive
            g_form.setValue("selected_friends", mappedArray[i], res[i]);
            g_form.setValue("how_are_you_feeling", mappedArray[i]);
            g_form.submit();
        }
    }

    function ga2calls(response) {
        var res = JSON.parse(response);
        for (var i = 0; i < res.length; i++) {
            selectedValues.push(arrValue[i]);     //keeps the mrvs form alive
            g_form.setValue("selected_friends", arrValue[i], res[i]);
            g_form.setValue("how_are_you_feeling", arrValue[i]);
            g_form.submit();
        }
    }
}