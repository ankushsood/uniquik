import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {IMyDpOptions} from 'mydatepicker';
import {AuthenticationService} from '../services/authentication.service';
import {UserService} from '../services/user.service';

@Component({
  selector: 'candidateSignup',
  templateUrl: './candidateSignup.component.html',
  styleUrls: ['./candidateSignup.component.scss'],
  
})
export class CandidateSignupComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';
  redirectUrl: string;
  selectedCategories : any = new Array();
  catOptions: Select2Options;
  
  expCategories : any = [
                       {
                           id: "Sales",
                           text: "Sales",
                           children: [
                               {
                                   id: "Business Development",
                                   text: "Business Development"
                               },
                               {
                                   id: "Overseas Sales/International Sales",
                                   text: "Overseas Sales/International Sales"
                               },
                               {
                                   id: "Corporate Sales/Direct Sales/Industrial Sales",
                                   text: "Corporate Sales/Direct Sales/Industrial Sales"
                               },
                               {
                                   id: "Retail Sales",
                                   text: "Retail Sales"
                               },
                               {
                                   id: "IT Sales(Software &amp; Network)",
                                   text: "IT Sales(Software &amp; Network)"
                               },
                               {
                                   id: "Key Account Manager",
                                   text: "Key Account Manager"
                               }
                           ]
                       },
                       {
                           id: "Top Management",
                           text: "Top Management",
                           children: [
                               {
                                   id: "President/Head Representative of Local Subsidaryt",
                                   text: "President/Head Representative of Local Subsidary"
                               },
                               {
                                   id: "Executive Vice-president of Local Subsidiary",
                                   text: "Executive Vice-president of Local Subsidiary"
                               },
                               {
                                   id: "Plant Manager/Factory Manager",
                                   text: "Plant Manager/Factory Manager"
                               },
                               {
                                   id: "General Manager",
                                   text: "General Manager"
                               },
                               {
                                   id: "CFO/CEO/CMD",
                                   text: "CFO/CEO/CMD"
                               }
                           ]
                       },
                       {
                           id: "Planning/Marketing",
                           text: "Planning/Marketing",
                           children: [
                               {
                                   id: "Marketing, Advertising &amp; Sales Planning",
                                   text: "Marketing, Advertising &amp; Sales Planning"
                               },
                               {
                                   id: "Buying, Logistics &amp; Material Procurement",
                                   text: "Buying, Logistics &amp; Material Procurement"
                               },
                               {
                                   id: "Business Management",
                                   text: "Business Management"
                               }
                           ]
                       },
                       {
                           id: "Office Management",
                           text: "Office Management",
                           children: [
                               {
                                   id: "Office Management/Accounting and Finance",
                                   text: "Office Management/Accounting and Finance"
                               },
                               {
                                   id: "HR and Administration",
                                   text: "HR and Administration"
                               },
                               {
                                   id: "Legal",
                                   text: "Legal"
                               },
                               {
                                   id: "PR",
                                   text: "PR"
                               },
                               {
                                   id: "Secretaries, Clerical and Others",
                                   text: "Secretaries, Clerical and Others"
                               },
                               {
                                   id: "Tresury, Stock Offering and company secretary",
                                   text: "Tresury, Stock Offering and company secretary"
                               },
                               {
                                   id: "General Affairs",
                                   text: "General Affairs"
                               },
                               {
                                   id: "Front Office/Receptionsit/EA/Secretary",
                                   text: "Front Office/Receptionsit/EA/Secretary"
                               },          
                               {
                                   id: "Order Processing , Operation and Settlement",
                                   text: "Order Processing , Operation and Settlement"
                               }
                           ]
                       },
                       {
                           id: "Technical(Software/NW)",
                           text: "Technical(Software/NW)",
                           children: [
                               {
                                   id: "IT Consulting and Pre-sales",
                                   text: "IT Consulting and Pre-sales"
                               },
                               {
                                   id: "Research and Development",
                                   text: "Research and Development"
                               },
                               {
                                   id: "Others",
                                   text: "Others"
                               },
                               {
                                   id: "Database",
                                   text: "Database"
                               },
                               {
                                   id: "System Development(Embedded and Control)",
                                   text: "System Development(Embedded and Control)"
                               },
                               {
                                   id: "System Development(General)",
                                   text: "System Development(General)"
                               },
                               {
                                   id: "System Development(Web and Open System)",
                                   text: "System Development(Web and Open System)"
                               },
                               {
                                   id: "Project Manager",
                                   text: "Project Manager"
                               },          
                               {
                                   id: "Communication Software and Network",
                                   text: "Communication Software and Network"
                               },          
                               {
                                   id: "Technical Support",
                                   text: "Technical Support"
                               },          
                               {
                                   id: "Internal IT Administration",
                                   text: "Internal IT Administration"
                               }
                           ]
                       },  
                       {
                           id: "Technical(Electrical,Electronic and Precision)",
                           text: "Technical(Electrical,Electronic and Precision)",
                           children: [
                               {
                                   id: "Circuit and Packaging Design",
                                   text: "Circuit and Packaging Design"
                               },
                               {
                                   id: "Sales Engineer and FAE",
                                   text: "Sales Engineer and FAE"
                               },
                               {
                                   id: "Service Engineer",
                                   text: "Service Engineer"
                               },
                               {
                                   id: "Basic Research, Product Planning",
                                   text: "Basic Research, Product Planning"
                               },
                               {
                                   id: "Project Manager",
                                   text: "Project Manager"
                               },
                               {
                                   id: "Others",
                                   text: "Others"
                               },
                               {
                                   id: "Mechanisms Design",
                                   text: "Mechanisms Design"
                               },
                               {
                                   id: "Mold Design",
                                   text: "Mold Design"
                               },          
                               {
                                   id: "Injection Molding",
                                   text: "Injection Molding"
                               },          
                               {
                                   id: "Optical Design",
                                   text: "Optical Design"
                               },          
                               {
                                   id: "Industrial Science",
                                   text: "Industrial Science"
                               },          
                               {
                                   id: "Maintenance of Facility",
                                   text: "Maintenance of Facility"
                               },          
                               {
                                   id: "QA/QC",
                                   text: "QA/QC"
                               },          
                               {
                                   id: "Production Control",
                                   text: "Production Control"
                               }
                           ]
                       },
                       {
                           id: "Technical(Machinery)",
                           text: "Technical(Machinery)",
                           children: [
                               {
                                   id: "Production Control and QA",
                                   text: "Production Control and QA"
                               },
                               {
                                   id: "Project Manager",
                                   text: "Project Manager"
                               },
                               {
                                   id: "Others",
                                   text: "Others"
                               },
                               {
                                   id: "Basic Research, Production Planning and Others",
                                   text: "Basic Research, Production Planning and Others"
                               },
                               {
                                   id: "Maintenance of Facility",
                                   text: "Maintenance of Facility"
                               },
                               {
                                   id: "Mechanisms Design",
                                   text: "Mechanisms Design"
                               },
                               {
                                   id: "Process Engineer",
                                   text: "Process Engineer"
                               },
                               {
                                   id: "Sales Engineer and Service Engineer",
                                   text: "Sales Engineer and Service Engineer"
                               },          
                               {
                                   id: "Control Design",
                                   text: "Control Design"
                               },          
                               {
                                   id: "Industrial Science",
                                   text: "Industrial Science"
                               },          
                               {
                                   id: "Research and Development",
                                   text: "Research and Development"
                               }
                           ]
                       },
                       {
                           id: "Technical (Chemical/Food/Medical/Oil)",
                           text: "Technical (Chemical/Food/Medical/Oil)",
                           children: [
                               {
                                   id: "Clinical Development",
                                   text: "Clinical Development"
                               },
                               {
                                   id: "Product Development",
                                   text: "Product Development"
                               },
                               {
                                   id: "Production Control and QA",
                                   text: "Production Control and QA"
                               },
                               {
                                   id: "QA",
                                   text: "QA"
                               },
                               {
                                   id: "Application",
                                   text: "Application"
                               },
                               {
                                   id: "Others",
                                   text: "Others"
                               },
                               {
                                   id: "Chemical Engineering",
                                   text: "Chemical Engineering"
                               },
                               {
                                   id: "Medical, Pharmaceutical and Biomedical Engineering",
                                   text: "Medical, Pharmaceutical and Biomedical Engineering"
                               },          
                               {
                                   id: "Oil, Gas and Marine Engineering",
                                   text: "Oil, Gas and Marine Engineering"
                               }
                           ]
                       },
                       {
                           id: "Technical(Construction and Civil Engineering)",
                           text: "Technical(Construction and Civil Engineering)",
                           children: [
                               {
                                   id: "Execution Management",
                                   text: "Execution Management"
                               },
                               {
                                   id: "Building Equipment Work",
                                   text: "Building Equipment Work"
                               },
                               {
                                   id: "Project Manager",
                                   text: "Project Manager"
                               },
                               {
                                   id: "Design",
                                   text: "Design"
                               },
                               {
                                   id: "Quantity Survey",
                                   text: "Quantity Survey"
                               },
                               {
                                   id: "Others",
                                   text: "Others"
                               }
                           ]
                       },
                       {
                           id: "Professional(Finance/Real Estate/Consultant)",
                           text: "Professional(Finance/Real Estate/Consultant)",
                           children: [
                               {
                                   id: "Consulting",
                                   text: "Consulting"
                               },
                               {
                                   id: "Order Processing,Operation and Settlement",
                                   text: "Order Processing,Operation and Settlement"
                               },
                               {
                                   id: "Private Banking",
                                   text: "Private Banking"
                               },
                               {
                                   id: "Project Finance",
                                   text: "Project Finance"
                               },
                               {
                                   id: "Retail Banking",
                                   text: "Retail Banking"
                               },
                               {
                                   id: "Treasury",
                                   text: "Treasury"
                               },
                               {
                                   id: "Insurance",
                                   text: "Insurance"
                               },
                               {
                                   id: "Interpreting and Translation",
                                   text: "Interpreting and Translation"
                               },          
                               {
                                   id: "Financial Services",
                                   text: "Financial Services"
                               },          
                               {
                                   id: "Real Estate and Property Management",
                                   text: "Real Estate and Property Management"
                               },          
                               {
                                   id: "Corporate Banking and Finance",
                                   text: "Corporate Banking and Finance"
                               },          
                               {
                                   id: "Credit Analysis",
                                   text: "Credit Analysis"
                               },          
                               {
                                   id: "Equities,Capital Markets and Securities",
                                   text: "Equities,Capital Markets and Securities"
                               },          
                               {
                                   id: "Funds Management",
                                   text: "Funds Management"
                               },          
                               {
                                   id: "Investment",
                                   text: "Investment"
                               },          
                               {
                                   id: "Loan and Mortgage",
                                   text: "Loan and Mortgage"
                               }
                           ]
                       },
                       {
                           id: "Creative",
                           text: "Creative",
                           children: [
                               {
                                   id: "Web Designer and Web Master",
                                   text: "Web Designer and Web Master"
                               },
                               {
                                   id: "Web Editing and Contents Planning",
                                   text: "Web Editing and Contents Planning"
                               },
                               {
                                   id: "Web Producer and Director",
                                   text: "Web Producer and Director"
                               },
                               {
                                   id: "Industrial Design and Development",
                                   text: "Industrial Design and Development"
                               },
                               {
                                   id: "Advertising, Media, Games and Others",
                                   text: "Advertising, Media, Games and Others"
                               },
                               {
                                   id: "Architect/Interior Decorator",
                                   text: "Architect/Interior Decorator"
                               },
                               {
                                   id: "HR and Career Consulting",
                                   text: "HR and Career Consulting"
                               }
                           ]
                       },
                       {
                           id: "Service",
                           text: "Service",
                           children: [
                               {
                                   id: "Merchandiser and Buyer",
                                   text: "Merchandiser and Buyer"
                               },
                               {
                                   id: "Nurse",
                                   text: "Nurse"
                               },
                               {
                                   id: "FC and Store Development",
                                   text: "FC and Store Development"
                               },
                               {
                                   id: "Superviser",
                                   text: "Superviser"
                               },
                               {
                                   id: "Store Manager, Sales and Branch Management",
                                   text: "Store Manager, Sales and Branch Management"
                               },
                               {
                                   id: "Customer Support",
                                   text: "Customer Support"
                               },
                               {
                                   id: "Call Center",
                                   text: "Call Center"
                               },
                               {
                                   id: "Overall Traveling",
                                   text: "Overall Traveling"
                               },          
                               {
                                   id: "Chef",
                                   text: "Chef"
                               },          
                               {
                                   id: "Doctor",
                                   text: "Doctor"
                               }
                           ]
                       }
                   ];
  
  
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private userService: UserService) {
    this.redirectUrl = this.activatedRoute.snapshot.queryParams['redirectTo'];
  }

  public myDatePickerOptions: IMyDpOptions = {
          dateFormat: 'dd/mm/yyyy',
  };
  
  ngOnInit(): void {
      this.catOptions = { multiple: true};
    this.userService.logout();
  }

  login() {
    this.loading = true;

    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        result => {
          this.loading = false;
              console.log(result);
        /*  if (result) {
            this.userService.login(result);
            this.navigateAfterSuccess();
          } else {
            this.error = 'Username or password is incorrect';
          }*/
        },
        error => {
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      );
  }

  private navigateAfterSuccess() {
    if (this.redirectUrl) {
      this.router.navigateByUrl(this.redirectUrl);
    } else {
      this.router.navigate(['/']);
    }
  }
}
