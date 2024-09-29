var PLUGIN_NAME = "CFPaymentGateway";
var version = "1.0.6";
function validateDropInput(cfDropPayment) {
    if (cfDropPayment) {
        if (cfDropPayment.session) {
            if (!cfDropPayment.session.payment_session_id) {
                return "payment_session_id object is missing in session object";
            }
            if (!cfDropPayment.session.orderID) {
                return "orderID object is missing in session object";
            }
            if (!cfDropPayment.session.environment) {
                return "environment object is missing in session object";
            }
            return null;
        }
        else {
            return "session object is missing in cfDropPayment object";
        }
    }
    else {
        return "cfDropPayment object is missing";
    }
}
function validateWebInput(cfWebPayment) {
    if (cfWebPayment) {
        if (cfWebPayment.session) {
            if (!cfWebPayment.session.payment_session_id) {
                return "payment_session_id object is missing in session object";
            }
            if (!cfWebPayment.session.orderID) {
                return "orderID object is missing in session object";
            }
            if (!cfWebPayment.session.environment) {
                return "environment object is missing in session object";
            }
            return null;
        }
        else {
            return "session object is missing in cfWebPayment object";
        }
    }
    else {
        return "cfWebPayment object is missing";
    }
}
function validateUPIInput(cfUPIPayment) {
    if (cfUPIPayment) {
        if (cfUPIPayment.session) {
            if (!cfUPIPayment.session.payment_session_id) {
                return "payment_session_id object is missing in session object";
            }
            if (!cfUPIPayment.session.orderID) {
                return "orderID object is missing in session object";
            }
            if (!cfUPIPayment.session.environment) {
                return "environment object is missing in session object";
            }
            return null;
        }
        else {
            return "session object is missing in cfUPIPayment object";
        }
    }
    else {
        return "cfUPIPayment object is missing";
    }
}
function getError(message, orderId) {
    return {
        status: 'FAILED',
        message: message,
        code: 'payment_failed',
        type: 'request_failed',
        orderID: (orderId) ? orderId : "NA",
    };
}
var CFPaymentGatewayService = module.exports = {
    cfCallback: null,
    doUPIPayment: function (cfUPIPayment) {
        var callback = this.cfCallback;
        var error = validateUPIInput(cfUPIPayment);
        if (error) {
            if (callback) {
                // @ts-ignore
                callback.onError(getError(error));
            }
            return;
        }
        cordova.exec(function (result) {
            // @ts-ignore
            if (callback) {
                // @ts-ignore
                callback.onVerify(result);
            }
        }, function (error) {
            // @ts-ignore
            if (callback) {
                // @ts-ignore
                callback.onError(error);
            }
        }, PLUGIN_NAME, 'doUPIPayment', [JSON.stringify(cfUPIPayment), version]);
    },
    doDropPayment: function (cfDropPayment) {
        var callback = this.cfCallback;
        var error = validateDropInput(cfDropPayment);
        if (error) {
            if (callback) {
                // @ts-ignore
                callback.onError(getError(error));
            }
            return;
        }
        cordova.exec(function (result) {
            // @ts-ignore
            if (callback) {
                // @ts-ignore
                callback.onVerify(result);
            }
        }, function (error) {
            // @ts-ignore
            if (callback) {
                // @ts-ignore
                callback.onError(error);
            }
        }, PLUGIN_NAME, 'doDropPayment', [JSON.stringify(cfDropPayment), version]);
    },
    doWebCheckoutPayment: function (cfWebPayment) {
        var callback = this.cfCallback;
        var error = validateWebInput(cfWebPayment);
        if (error) {
            if (callback) {
                // @ts-ignore
                callback.onError(getError(error));
            }
            return;
        }
        cordova.exec(function (result) {
            // @ts-ignore
            if (callback) {
                // @ts-ignore
                callback.onVerify(result);
            }
        }, function (error) {
            // @ts-ignore
            if (callback) {
                // @ts-ignore
                callback.onError(error);
            }
        }, PLUGIN_NAME, 'doWebCheckoutPayment', [JSON.stringify(cfWebPayment), version]);
    },
    setCallback: function (cfCallback) {
        this.cfCallback = cfCallback;
        cordova.exec(function (result) {
            // @ts-ignore
            if (cfCallback) {
                // @ts-ignore
                cfCallback.onVerify(result);
            }
        }, function (error) {
            // @ts-ignore
            if (cfCallback) {
                // @ts-ignore
                cfCallback.onError(error);
            }
        }, PLUGIN_NAME, 'setCallback', []);
    }
};
