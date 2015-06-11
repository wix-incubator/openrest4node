var chai = require("chai");
var openrest = require('../index.js');  
var openrestClient = require("../lib/openrest4js-client-1.1.1.js");

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

var expect = chai.expect;
var should = chai.should;

describe("Openrest node component", function() {
    it("should return results from the server", function(done) {
        openrest.request({
            request:{
                "type":"get_organization",
                "organizationId":"us.openrest.com"
            },
            callback:function(e) {

                expect(e.error).to.not.exist;
                expect(e.value.id).to.equal("us.openrest.com");
                done();
            }
        });
    });

    it("should return results from server as a promise", function() {
        return openrest.request({request:{"type":"get_organization", "organizationId":"us.openrest.com"}}).then(function(e) {
            expect(e.value.id).to.equal("us.openrest.com");
        });
    });

    it("should return error when sending a bad request", function(done) {
        openrest.request({
            request:{
                "type":"get_organization",
                "organizationId":"us.opaenrest.com"
            },
            callback:function(e) {
                expect(e.error).to.equal("not_found");
                done();
            }
        });
    });

    it("should fail (as a promise) when sending a bad request", function() {
        return expect(openrest.request({request:{"type":"get_organization", "organizationId":"us.openarest.com"}})).to.eventually.be.rejected;
    });

    it("should fail gracefully when getting an catastrophic error from the server", function() {

        var client = new openrestClient.Client({apiUrl:"http://www.google.com"});
        return openrest.request({client:client, request:{"type":"get_organization", "organizationId":"us.openrest.com"}}).then(function() {
            return Q.reject("Should fail");
        }).catch(function(e) {
            expect(e.error).to.equal("protocol");
        });
    });
});

