var openrest = require('./../index.js');  

openrest.request({
    request:{
        "type":"get_organization",
        "organizationId":"us.openrest.com"
    },
    callback:function(e) {
        if (e.error) {
            console.error("[ERROR] "+e.errorMessage);
            process.exit(-1);
        }

        if (e.value.id === "us.openrest.com") {
            console.log("Success.");
            process.exit(0);
        } else {
            console.error("[ERROR] ", e.value);
            process.exit(-1);
        }
    }
});
