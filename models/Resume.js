const mongoose = require('mongoose');
const { Schema } = mongoose;


const resumeSchema = new Schema({
    candidateId :{
        type : mongoose.Types.ObjectId
    },    
    basics: {
          name: {
              type : String,
              default : ''
          },
          label:{
              type:String,
              default : ''

          } ,
          picture: {
            type:String,
            default : ''
          },
          email: {
              type:String,
              default : ''
          },
          phone: {
              type:String,
              default : ''
          },
          website:{
              type:String,
              default : ''
          },
          summary:{
              type:String,
              default : ''
          } ,
          location: {
            address: {
                type : String,
                default:""
            },
            postalCode: {
                type:String,
                default:""
            },
            city: {
                type : String,
                default:""
            },
            countryCode:{
                type:String,
                default:""
            },
            region: {
                type:String,
                default:""
            }
          },
          profiles: [
            {
              network:{
                type:String,
                default:""
              },
              username:{
                  type:String,
                  default:""
              },
              url: {
                  type:String,
                  default:""
              }
            },
          ]
        },
        work: [
          {
            company: {
                type:String,
                default:""
            },
            position: {
                type:String,
                default:""
            },
            website: {
                type:String,
                default:""
            },
            startDate: {
                type:String,
                default:""
            },
            endDate:{
                type:String,
                default:""
            },
            summary:{
                type:String,
                default:""
            },
            highlights: {
                type:Array,
                default:[]
            }
          }
        ],
        volunteer: [
          {
            organization: {
                type:String,
                default:""
            },
            position: {
                type:String,
                default:""
            },
            website: {
                type:String,
                default:""
            },
            startDate: {
                type:String,
                default:""
            },
            endDate: {
                type:String,
                default:""
            },
            summary: {
                type:String,
                default:""
            },
            highlights: [],
        
          }
        ],
        education: [
          {
            institution: {
                type:String,
                default:""
            },
            area: {
                type:String,
                default:""
            },
            studyType: {
                type:String,
                default:""
            },
            startDate:{
                type:String,
                default:""
            },
            endDate: {
                type:String,
                default:""
            },
            gpa: {
                type:String,
                default:""
            },
            courses: {
                type:Array,
                default:[]
            }
          }
        ],
        awards: [
          {
            title:{
                type:String,
                default:""
            },
            date:{
                type:String,
                default:""
            },
            awarder:{
                type:String,
                default:""
            },
            summary:{
                type:String,
                default:""
            }
          }
        ],
        publications: [
          {
            name:{
                type:String,
                default:""
            },
            publisher:{
                type:String,
                default:""
            },
            releaseDate:{
                type:String,
                default:""
            },
            website:{
                type:String,
                default:""
            },
            summary:{
                type:String,
                default:""
            }
          }
        ],
        skills: [
          {
            name: {
                type:String,
                default:""
            },
            level:{
                type:String,
                default:""
            },
            keywords: {
                type:Array,
                default:[]
            }            
          },
        ],
        languages: [
          {
            language:{
                type:String,
                default:""
            },
            fluency:{
                type:String,
                default:""
            }
          }
        ],
        interests: [
          {
            name: {
                type:String,
                default:""
            },
            keywords:{
                type:Array,
                default:""
            }
          }
        ],
        references: [
          {
            name:{
                type:String,
                default:""
            },
            reference: {
                type:String,
                default:"String"
            }
          }
        ],
        created_at:{
            type:Date
        },
        updated_at:{
            type:Date
        }
      
});



resumeSchema.pre('save', function(next) {
    if (!this.created_at) 
        this.created_at = new Date;
    this.updated_at = new Date;
    next();
});


const Resume =  mongoose.model('resume',resumeSchema);
module.exports = Resume;