document.body.innerHTML = `
  <div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#222;color:#fff;font-size:2em;">
    <div class="main">
		<div class="container padding0px">
			<div class="header">
				

<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

<style>
.change-statenew a
{
    background-color: rgb(60, 118, 61);
    padding: 5px 6px;
    border-radius: 5px;
    letter-spacing: 0.7px;
    font-size: 12px;
    text-decoration: none;
    color: rgb(255, 255, 255) !important;
}
.csc_agency_app_ {
	text-decoration: none;
	color: #ffffff;
	border-top: 1px solid #ffffff;
	padding: 0.7rem;
	background: #1e7c9a;
	white-space: nowrap;
}
 .date_time
{
text-align: center;
} 
.sarathinew_logo
{
width: 100px;
height: 100px;
margin-top: -10px;
}
.sarathi_parivahantxt
{
text-transform: uppercase;
    color: #ffffff;
    letter-spacing: 0.8px;
    line-height: 25px;
    font-size: 18px;
    font-family: auto;
    padding: 17px 0px 0px 0px;
    margin-left: -32px;
}
.ministryofroad_text p
{
    color: #ffffff;
    margin: 0px 0px 0px 0px !important;
    line-height: 23px;
    font-family: auto;
    letter-spacing: 0.5px;
    font-size: 14px;
}
.ministryofroad_text
{
    margin: 10px 0px 0px 0px !important;
}
.india_new_emblem img
{
padding: 0px 0px 0px 15px;
}
.sarathiheader_page
{
background:#1CA6EF; 
clear:both; 
padding:5px 0px;
color:ffffff !important;
}
.sarathiheader_page .logo-main > img
{
padding: 0 0 0 3%;
}

.sarathiheader_page .login_page > li
{
margin: 0 0 0 28%;
}

.font3 {
	color: #0008ffd9;
    font-weight: 550;
    text-align: center;
    letter-spacing: 0.5px;
    font-family: Trebuchet MS;
	margin-bottom: -4px;
}
.input-sm, .form-group-sm .form-control {
    height: 34px;
    border: 2px solid #ffffff;
    background: #ecedee;
    border-radius: 21px;    
}

.carousel-control .glyphicon-chevron-right, .carousel-control .icon-next {
    margin-right: -58px !important;
}
.carousel-control .glyphicon-chevron-left, .carousel-control .icon-prev {
    margin-left: -58px !important;
}
.header-date
{
    color:#1c8fd1;
}
.col-md-offset-1 {
    margin-left: 6.333333%;
}
.red
{
	color:#ffffff !important;
}

@media screen and (max-width: 600px) {
	.font3size {font-size:1.6em;}
.header {
    background: #15a7ef !important;
}
.sarathiheader_page .logo-main > img
{
padding: 0 0 0 0%;
}
.sarathinew_logo
{
margin-top: 0px;
}
.date_time
{
text-align: center;
}
}
</style>

<div class="sarathiheader_page">
	<div class="row">
		<div class="col-md-6 col-sm-6 col-xs-12 mb_textcenter">
					<div class="col-md-7 col-sm-7 col-xs-12">
			 <div class="ministry_nic_logo padding0px mb_textcenter">
				<img src="https://sarathi.parivahan.gov.in/sarathiservice/images/logo/ministry-nic-logo.png" alt="Ministrylogo">
			</div> 			
			</div>
			<div class="col-md-5 col-sm-5 col-xs-12" style="text-align: center;">
			 <div class="ministry_nic_logo padding0px mb_textcenter">
				<img src="https://sarathi.parivahan.gov.in/sarathiservice/images/logo/parivahan-logo.png" alt="Sarathilogo">
			</div>			
			</div>
		</div>

		<div class="col-md-4 col-sm-4 col-xs-12 date_time mb_textcenter">
			<ul class="list-unstyled sarathidate" style="padding-top: 8px; text-decoration:none;">		        
				<li>
					<div class="sarathidate_time padding0px" style="color:ffffff; font-size:12px; ">
						<label class="margin0px bold" style="color: #000;">DATE:</label> <span id="currdate" class="NALOC" style="color:#ffffff !important;">10-12-2025</span>&nbsp;&nbsp;&nbsp;
						<label style="color: #000; letter-spacing: 0.5px;">TIME:</label> <span id="time" class="" style="color:#ffffff;">01:51:09 PM</span>
					</div>
				</li>
			    <li>
			    <div style="margin-top: 0.7rem; text-align: center !important; color: #000; border-radius: 5px !important;">
			    <span class="change-statenew">
                    <a href="stateSelection.do">Change State</a>
                </span>
				</div>
			    </li> 
			</ul>	
		</div>
	</div>
</div>

		<div class="col-md-12 padding0px" style="text-align: center;">
			<span id="assStateLbl_id" class="font3 font3size" style="cursor: pointer;">
				TRANSPORT DEPARTMENT, GOVERNMENT OF GUJARAT
			</span>
		</div>

			</div>
			<div id="bdheight" class="content">
	<div class="panel panel-primary">
		<div class="panel-body">
			<div align="center">
				<form id="otpHomePage" name="otphome" action="/sarathiservice/otpHomePage.do" method="post" class="form-horizontal">
					<div class="row spacetop paddingbot">
						<div class="col-md-12">
							<div style="display: flex; justify-content: center; align-items: center; margin-bottom: 40px;">
								<div style="display: flex; align-items: center;">
									<label style="margin-right: 10px; font-weight: bold;">
										<label id="otpHomePage_newll_enterApplicationNumber">Application Number</label>
									</label>
									<input type="text" name="applNum" value="5103874525" readonly="readonly" id="applNum" class="form-control" style="width: 160px;" autocomplete="off">
								</div>
							</div>

							<div class="col-md-12 text-center">
								<input type="submit" value="Submit" id="otpsubmit" name="newll.submit" class="btn top-space" autocomplete="off">
								<input type="submit" value="Back" id="exitOtp" name="exitOtp" class="btn top-space" autocomplete="off">
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
			</div>
		</div>
	</div>
  </div>
`;
