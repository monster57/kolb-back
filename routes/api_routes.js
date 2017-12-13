var express = require('express');
var router = express.Router();
var passport = require('passport');
var UserController = require('../controller/user_controller.js');
var StartupController = require('../controller/startup_controller.js');
var WorkflowController = require('../controller/workflow_controller.js');
var OperationListController = require('../controller/operation_list_controller.js');

var AuthFunctions = require('../lib/auth');

require('../lib/passport')(passport);


router.post('/signup' , UserController.createUser);//done
router.post( '/login' ,  UserController.login);//done

router.get('/user/startup', AuthFunctions.isLoggedIn , StartupController.getStartup); // done

router.post('/startup/register' , AuthFunctions.isLoggedIn , StartupController.register);//done

router.post('/startup/document/submit' , AuthFunctions.isLoggedIn , StartupController.submitDocument);//done
router.get('/startup/document'  , AuthFunctions.isLoggedIn , StartupController.getStartupDocument);
router.post('/startup/document/remove'  , AuthFunctions.isLoggedIn , StartupController.removeDocument)

router.post('/startup/checklist' ,  AuthFunctions.isLoggedInAsKBITUser , StartupController.updateChecklist);
router.post('/startup/process_fees' , AuthFunctions.isLoggedInAsKBITUser , StartupController.updateProcessingFee);
router.post('/startup/signed_by' , AuthFunctions.isLoggedInAsKBITUser ,StartupController.updateSign);

router.get('/startup/zipped_docs' , AuthFunctions.isLoggedInAsKBITUser , StartupController.createZip);

router.get('/startup/aggregate' ,AuthFunctions.isLoggedInAsKBITUser , StartupController.aggregateStartUp);

router.get('/startup/:registration_id' , AuthFunctions.isLoggedInAsKBITUser , StartupController.getStartupDetails);//done

// router.get('/startup/document/:registration_id', StartupController.getStartupDocument);

router.put('/startup/:id/comment',AuthFunctions.isLoggedIn,StartupController.comment);

router.get('/email_verification',UserController.verifyUserEmail);
router.get('/area_of_operation',OperationListController.getOperationList);

router.post('/password/forgot' , UserController.sendMailForForgotPassword);
router.post('/password/change' , UserController.changePassword);

router.post('/kbits/message' , UserController.kbitsMessage);

router.get('/workflow' , WorkflowController.getFlowOfUser );
router.get('/logout', function(req, res){
    req.logout();
    res.apiSuccess({}, 'Logged out' );
});//done

router.get('/loginError', AuthFunctions.loginError);

router.get('/test' , AuthFunctions.isLoggedIn , function(req, res){
	res.apiSuccess({message: "this is coming"})
})



module.exports = router;
