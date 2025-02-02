const { Router } = require("express");
const enquiryRoute = require("../EnquiryFolder/enquiryRoute.js");
const admissionRoute = require("../AdmissionFolder/admissionRoute.js");
const trainerRoute = require("../trainers/route.js");
const dashboardRoute = require("../DashboardFolder/dashboardRoute.js");
const courseRoute = require("../Course/routes.js");

const rootRouter = Router();

rootRouter.use("/dashborad", dashboardRoute)
rootRouter.use("/enquiry", enquiryRoute)
rootRouter.use("/course", courseRoute)
rootRouter.use("/admission", admissionRoute)
rootRouter.use("/trainer", trainerRoute)

module.exports = {rootRouter}