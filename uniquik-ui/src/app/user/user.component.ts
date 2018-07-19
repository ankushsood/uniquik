import {Component, OnInit} from '@angular/core';
import {JwtHelper} from 'angular2-jwt';
import {AppDataService} from '../services/app-data.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
	city$;
	jobs : any = [];
    searchedJobs : any = [];
	loggedInUser : any;
	isLoaded : boolean = false;
    catOptions: Select2Options;
    searchIndustry : any = '';
    searchOccupation : any = '';
    searchLocation : any = '';
    jwtHelper: JwtHelper = new JwtHelper();

	constructor(private appDataService: AppDataService,
				private router: Router,
				private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.catOptions = { multiple: true};
	let accessToken = localStorage.getItem('access_token');
	let decodedToken = this.jwtHelper.decodeToken(accessToken);
	this.loggedInUser = {firstName : ''};
	this.appDataService.getJobs(decodedToken.user_name).subscribe(
          data =>{
            this.jobs = data;
			this.jobs = JSON.parse(this.jobs._body);
			this.loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
			this.isLoaded = true;
		} , error =>{
				console.log(error);
	            this.isLoaded = true;

          });;
  }
  
    findJob(){

        this.appDataService.searchJobs(this.searchIndustry, this.searchOccupation, this.searchLocation).subscribe(
          data =>{
            this.jobs = data;
            this.jobs = JSON.parse(this.jobs._body);
            this.loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
            this.isLoaded = true;
        } , error =>{
                console.log(error);
                this.isLoaded = true;

        });;
    }
  
  editJob(job){
	  localStorage.setItem('editJob', JSON.stringify(job));
      this.router.navigateByUrl('postJob');

	  
  }
  
  deleteJob(job){
	this.appDataService.deleteJob(job).subscribe(
          data =>{
            this.jobs = JSON.parse(data.text());

          } , error =>{
                console.log(error);

          });;
  }
    
  
  location : any = [
                    { id:"Andaman and Nicobar Islands",text:"Andaman and Nicobar Islands"},
                    { id:"Andhra Pradesh",text:"Andhra Pradesh"},
                    { id:"Arunachal Pradesh",text:"Arunachal Pradesh"},
                    { id:"Assam",text:"Assam"},
                    { id:"Bihar",text:"Bihar"},
                    { id:"Chandigarh",text:"Chandigarh"},
                    { id:"Chhattisgarh",text:"Chhattisgarh"},
                    { id:"Dadra and Nagar Haveli",text:"Dadra and Nagar Haveli"},
                    { id:"Daman and Diu",text:"Daman and Diu"},
                    { id:"Delhi",text:"Delhi"},
                    { id:"Goa",text:"Goa"},
                    { id:"Gujarat",text:"Gujarat"},
                    { id:"Haryana",text:"Haryana"},
                    { id:"Himachal Pradesh",text:"Himachal Pradesh"},
                    { id:"Jammu and Kashmir",text:"Jammu and Kashmir"},
                    { id:"Jharkhand",text:"Jharkhand"},
                    { id:"Karnataka",text:"Karnataka"},
                    { id:"Kerala",text:"Kerala"},
                    { id:"Lakshadweep",text:"Lakshadweep"},
                    { id:"Madhya Pradesh",text:"Madhya Pradesh"},
                    { id:"Maharashtra",text:"Maharashtra"},
                    { id:"Manipur",text:"Manipur"},
                    { id:"Meghalaya",text:"Meghalaya"},
                    { id:"Mizoram",text:"Mizoram"},
                    { id:"Nagaland",text:"Nagaland"},
                    { id:"Orissa",text:"Orissa"},
                    { id:"Puducherry",text:"Puducherry"},
                    { id:"Punjab",text:"Punjab"},
                    { id:"Rajasthan",text:"Rajasthan"},
                    { id:"Sikkim",text:"Sikkim"},
                    { id:"Tamil Nadu",text:"Tamil Nadu"},
                    { id:"Tripura",text:"Tripura"},
                    { id:"Uttar Pradesh",text:"Uttar Pradesh"},
                    { id:"Uttarakhand",text:"Uttarakhand"},
                    { id:"Paschim Banga/West Bengal",text:"Paschim Banga/West Bengal"},
                    { id:"Kolkata",text:"Kolkata"},
                    { id:"Hyderabad",text:"Hyderabad"},
                    { id:"Chandigarh",text:"Chandigarh"},
                    { id:"Mumbai",text:"Mumbai"},
                    { id:"Ahmedabad",text:"Ahmedabad"},
                    { id:"Chandigarh",text:"Chandigarh"},
                    { id:"Bengaluru",text:"Bengaluru"},
                    { id:"Chennai",text:"Chennai"},
                    { id:"Chandigarh",text:"Chandigarh"},
                    { id:"Guwahati",text:"Guwahati"},
                    { id:"Noida",text:"Noida"},
                    { id:"Gurgaon",text:"Gurgaon"},
                    { id:"Pune",text:"Pune"},
                    { id:"Varodara",text:"Varodara"},
                    { id:"Jamshedpur",text:"Jamshedpur"},
                    { id:"Nagpur",text:"Nagpur"},
                    { id:"Cohin",text:"Cohin"},
                    { id:"Japan",text:"Japan"},
                    { id:"Hongkong",text:"Hongkong"},
                    { id:"China",text:"China"},
                    { id:"USA",text:"USA"},
                    { id:"Middle east",text:"Middle east"},
                    { id:"Thailand",text:"Thailand"},
                    { id:"Singapore",text:"Singapore"},
                    { id:"Tada(Sri City)",text:"Tada(Sri City)"},
                    { id:"Faridabad",text:"Faridabad"},
                    { id:"Manesar",text:"Manesar"},
                    { id:"Bawal",text:"Bawal"},
                    { id:"Tapukhera",text:"Tapukhera"},
                    { id:"Rohtak",text:"Rohtak"},
                    { id:"Ranchi",text:"Ranchi"},
                    { id:"Mysore",text:"Mysore"},
                    { id:"Jalandhar",text:"Jalandhar"},
                    { id:"Ludhiana",text:"Ludhiana"},
                    { id:"Jaipur",text:"Jaipur"},
                    { id:"Neemrana",text:"Neemrana"},
                    { id:"Greater Noida",text:"Greater Noida"},
                    { id:"Ghaziabad",text:"Ghaziabad"},
                    { id:"Lucknow",text:"Lucknow"},
                    { id:"Anywhere",text:"Anywhere"},
                    { id:"Foreign",text:"Foreign"},
                    { id:"Others",text:"Others"}
                ];
  industries : any = [
                  { id:"Overall",text:"Overall"},
                  { id:"IT and Software",text:"IT and Software"},
                  { id:"Manufacturing(Electrical,Electronic and Precision)",text:"Manufacturing(Electrical,Electronic and Precision)"},
                  { id:"Manufacturing(Automobile)",text:"Manufacturing(Automobile)"},
                  { id:"Manufacturing(Machinery)",text:"Manufacturing(Machinery)"},
                  { id:"Manufacturing(Chemical and Material)",text:"Manufacturing(Chemical and Material)"},
                  { id:"Manufacturing(Apparels)",text:"Manufacturing(Apparels)"},
                  { id:"Manufacturing(Foods and Medical)",text:"Manufacturing(Foods and Medical)"},
                  { id:"Manufacturing(Others)",text:"Manufacturing(Others)"},
                  { id:"Trading",text:"Trading"},
                  { id:"Distribution and Retail",text:"Distribution and Retail"},
                  { id:"Transportation, Logistics and Warehouse",text:"Transportation, Logistics and Warehouse"},
                  { id:"Advertisement, Printing, Mass Communication",text:"Advertisement, Printing, Mass Communication"},
                  { id:"Service(Hotel, Travel, Beauty)",text:"Service(Hotel, Travel, Beauty)"},
                  { id:"Service(Restaurant, Foods)",text:"Service(Restaurant, Foods)"},
                  { id:"Consulting",text:"Consulting"},
                  { id:"Legal and Accounting",text:"Legal and Accounting"},
                  { id:"Mass Communication and Entertainments",text:"Mass Communication and Entertainments"},
                  { id:"Banking,Finance,Securities and Insurance",text:"Banking,Finance,Securities and Insurance"},
                  { id:"Construction and Civil Engineering",text:"Construction and Civil Engineering"},
                  { id:"Real Estate",text:"Real Estate"},
                  { id:"Education",text:"Education"},
                  { id:"Medical, Pharmaceutical, Hospital and Nursing",text:"Medical, Pharmaceutical, Hospital and Nursing"},
                  { id:"Interpreting and Translation",text:"Interpreting and Translation"},
                  { id:"Others",text:"Others"},
                  { id:"Telecommunications",text:"Telecommunications"},
                  { id:"Aerospace and Aviation",text:"Aerospace and Aviation"},
                  { id:"Energy, Oil, Gas and Water",text:"Energy, Oil, Gas and Water"},
                  { id:"BPO and Call Center",text:"BPO and Call Center"},
                  { id:"Manufacturing (Steel, Iron and Metal)",text:"Manufacturing (Steel, Iron and Metal)"},
                  { id:"Mining",text:"Mining"},
                  { id:"Consumer Durable and Office Automation",text:"Consumer Durable and Office Automation"},
                  { id:"FMCG / Foods / Beverage / Dairy",text:"FMCG / Foods / Beverage / Dairy"},
                  { id:"Agriculture, Fertilizers",text:"Agriculture, Fertilizers "},
                  { id:"IT Hardware and networking",text:"IT Hardware and networking"}
              ];
  expCategories : any = [
                       {id: "Sales",text: "Sales",children: [
                               {    id: "Business Development", text: "Business Development" },
                               {    id: "Overseas Sales/International Sales", text: "Overseas Sales/International Sales"    },
                               {    id: "Corporate Sales/Direct Sales/Industrial Sales", text: "Corporate Sales/Direct Sales/Industrial Sales"  },
                               {    id: "Retail Sales", text: "Retail Sales"    },
                               {    id: "IT Sales(Software &amp; Network)", text: "IT Sales(Software &amp; Network)"    },
                               {    id: "Key Account Manager", text: "Key Account Manager"  }
                           ]
                       },
                       {id: "Top Management", text: "Top Management",children: [
                               {id: "President/Head Representative of Local Subsidaryt",text: "President/Head Representative of Local Subsidary"},
                               {id: "Executive Vice-president of Local Subsidiary",text: "Executive Vice-president of Local Subsidiary"},
                               {id: "Plant Manager/Factory Manager",text: "Plant Manager/Factory Manager"},
                               {id: "General Manager",text: "General Manager"},
                               {id: "CFO/CEO/CMD",text: "CFO/CEO/CMD"}
                           ]
                       },
                       {id: "Planning/Marketing",text: "Planning/Marketing",children: [
                               {id: "Marketing, Advertising &amp; Sales Planning",text: "Marketing, Advertising &amp; Sales Planning"},
                               {id: "Buying, Logistics &amp; Material Procurement",text: "Buying, Logistics &amp; Material Procurement"},
                               {id: "Business Management",text: "Business Management"}
                           ]
                       },
                       {id: "Office Management",text: "Office Management",children: [
                               {id: "Office Management/Accounting and Finance",text: "Office Management/Accounting and Finance"},
                               {id: "HR and Administration",text: "HR and Administration"},
                               {id: "Legal",text: "Legal"},
                               {id: "PR",text: "PR"},
                               {id: "Secretaries, Clerical and Others",text: "Secretaries, Clerical and Others"},
                               {id: "Tresury, Stock Offering and company secretary",text: "Tresury, Stock Offering and company secretary"},
                               {id: "General Affairs",text: "General Affairs"},
                               {id: "Front Office/Receptionsit/EA/Secretary",text: "Front Office/Receptionsit/EA/Secretary"},          
                               {id: "Order Processing , Operation and Settlement",text: "Order Processing , Operation and Settlement"}
                           ]
                       },
                       {id: "Technical(Software/NW)",text: "Technical(Software/NW)",children: [
                               {id: "IT Consulting and Pre-sales",text: "IT Consulting and Pre-sales"},
                               {id: "Research and Development",text: "Research and Development"},
                               {id: "Others",text: "Others"},
                               {id: "Database",text: "Database"},
                               {id: "System Development(Embedded and Control)",text: "System Development(Embedded and Control)"},
                               {id: "System Development(General)",text: "System Development(General)"},
                               {id: "System Development(Web and Open System)",text: "System Development(Web and Open System)"},
                               {id: "Project Manager",text: "Project Manager"},          
                               {id: "Communication Software and Network",text: "Communication Software and Network"},          
                               {id: "Technical Support",text: "Technical Support"},          
                               {id: "Internal IT Administration",text: "Internal IT Administration"}
                           ]
                       },  
                       {id: "Technical(Electrical,Electronic and Precision)",text: "Technical(Electrical,Electronic and Precision)",children: [
                               {id: "Circuit and Packaging Design",text: "Circuit and Packaging Design"},
                               {id: "Sales Engineer and FAE",text: "Sales Engineer and FAE"},
                               {id: "Service Engineer",text: "Service Engineer"},
                               {id: "Basic Research, Product Planning",text: "Basic Research, Product Planning"},
                               {id: "Project Manager",text: "Project Manager"},
                               {id: "Others",text: "Others"},
                               {id: "Mechanisms Design",text: "Mechanisms Design"},
                               {id: "Mold Design",text: "Mold Design"},          
                               {id: "Injection Molding",text: "Injection Molding"},          
                               {id: "Optical Design",text: "Optical Design"},          
                               {id: "Industrial Science",text: "Industrial Science"},          
                               {id: "Maintenance of Facility",text: "Maintenance of Facility"},          
                               {id: "QA/QC",text: "QA/QC"},          
                               {id: "Production Control",text: "Production Control"}
                           ]
                       },
                       {id: "Technical(Machinery)",text: "Technical(Machinery)",children: [
                               {id: "Production Control and QA",text: "Production Control and QA"},
                               {id: "Project Manager",text: "Project Manager"},
                               {id: "Others",text: "Others"},
                               {id: "Basic Research, Production Planning and Others",text: "Basic Research, Production Planning and Others"},
                               {id: "Maintenance of Facility",text: "Maintenance of Facility"},
                               {id: "Mechanisms Design",text: "Mechanisms Design"},
                               {id: "Process Engineer",text: "Process Engineer"},
                               {id: "Sales Engineer and Service Engineer",text: "Sales Engineer and Service Engineer"},          
                               {id: "Control Design",text: "Control Design"},          
                               {id: "Industrial Science",text: "Industrial Science"},          
                               {id: "Research and Development",text: "Research and Development"}
                           ]
                       },
                       {id: "Technical (Chemical/Food/Medical/Oil)",text: "Technical (Chemical/Food/Medical/Oil)",children: [
                               {id: "Clinical Development",text: "Clinical Development"},
                               {id: "Product Development",text: "Product Development"},
                               {id: "Production Control and QA",text: "Production Control and QA"},
                               {id: "QA",text: "QA"},
                               {id: "Application",text: "Application"},
                               {id: "Others",text: "Others"},
                               {id: "Chemical Engineering",text: "Chemical Engineering"},
                               {id: "Medical, Pharmaceutical and Biomedical Engineering",text: "Medical, Pharmaceutical and Biomedical Engineering"},          
                               {id: "Oil, Gas and Marine Engineering",text: "Oil, Gas and Marine Engineering"}
                           ]
                       },
                       {id: "Technical(Construction and Civil Engineering)",text: "Technical(Construction and Civil Engineering)",children: [
                               {id: "Execution Management",text: "Execution Management"},
                               {id: "Building Equipment Work",text: "Building Equipment Work"},
                               {id: "Project Manager",text: "Project Manager"},
                               {id: "Design",text: "Design"},
                               {id: "Quantity Survey",text: "Quantity Survey"},
                               {id: "Others",text: "Others"}
                           ]
                       },
                       {id: "Professional(Finance/Real Estate/Consultant)",text: "Professional(Finance/Real Estate/Consultant)",children: [
                               {id: "Consulting",text: "Consulting"},
                               {id: "Order Processing,Operation and Settlement",text: "Order Processing,Operation and Settlement"},
                               {id: "Private Banking",text: "Private Banking"},
                               {id: "Project Finance",text: "Project Finance"},
                               {id: "Retail Banking",text: "Retail Banking"},
                               {id: "Treasury",text: "Treasury"},
                               {id: "Insurance",text: "Insurance"},
                               {id: "Interpreting and Translation",text: "Interpreting and Translation"},          
                               {id: "Financial Services",text: "Financial Services"},          
                               {id: "Real Estate and Property Management",text: "Real Estate and Property Management"},          
                               {id: "Corporate Banking and Finance",text: "Corporate Banking and Finance"},          
                               {id: "Credit Analysis",text: "Credit Analysis"},          
                               {id: "Equities,Capital Markets and Securities",text: "Equities,Capital Markets and Securities"},          
                               {id: "Funds Management",text: "Funds Management"},          
                               {id: "Investment",text: "Investment"},          
                               {id: "Loan and Mortgage",text: "Loan and Mortgage"}
                           ]
                       },
                       {id: "Creative",text: "Creative",children: [
                               {id: "Web Designer and Web Master",text: "Web Designer and Web Master"},
                               {id: "Web Editing and Contents Planning",text: "Web Editing and Contents Planning"},
                               {id: "Web Producer and Director",text: "Web Producer and Director"},
                               {id: "Industrial Design and Development",text: "Industrial Design and Development"},
                               {id: "Advertising, Media, Games and Others",text: "Advertising, Media, Games and Others"},
                               {id: "Architect/Interior Decorator",text: "Architect/Interior Decorator"},
                               {id: "HR and Career Consulting",text: "HR and Career Consulting"}
                           ]
                       },
                       {id: "Service",text: "Service",children: [
                               {id: "Merchandiser and Buyer",text: "Merchandiser and Buyer"},
                               {id: "Nurse",text: "Nurse"},
                               {id: "FC and Store Development",text: "FC and Store Development"},
                               {id: "Superviser",text: "Superviser"},
                               {id: "Store Manager, Sales and Branch Management",text: "Store Manager, Sales and Branch Management"},
                               {id: "Customer Support",text: "Customer Support"},
                               {id: "Call Center",text: "Call Center"},
                               {id: "Overall Traveling",text: "Overall Traveling"},          
                               {id: "Chef",text: "Chef"},          
                               {id: "Doctor",text: "Doctor"}
                           ]
                       }
                   ];
  
}
