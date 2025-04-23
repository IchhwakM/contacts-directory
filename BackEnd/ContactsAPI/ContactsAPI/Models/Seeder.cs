using ContactsAPI.Models;
using System.Collections.Generic;
using System.Linq;

namespace ContactsAPI
{
    public interface ISeeder
    {
        void SeedDatabase(AppDbContext context);
    }

    public class Seeder : ISeeder
    {
        public void SeedDatabase(AppDbContext context)
        {
            // Check if there are any records in the database
            if (!context.Contacts.Any())
            {
                // dummy data if the database is empty
                var contacts = new List<Contact>
                {
                    new Contact { Id = 1, Avatar = "https://randomuser.me/api/portraits/men/1.jpg", Title = "Mr.", FirstName = "John", MiddleName = "Edward", LastName = "Doe", Company = "TechCorp", JobTitle = "Software Engineer", Email = "john.doe@techcorp.com", Phone = "1234567890", Address = "123 Main St, Springfield, IL", Notes = "Likes coding and coffee.", IsFav = false },
                    new Contact { Id = 2, Avatar = "https://randomuser.me/api/portraits/women/2.jpg", Title = "Ms.", FirstName = "Jane", MiddleName = "Marie", LastName = "Smith", Company = "Creative Solutions", JobTitle = "Product Manager", Email = "jane.smith@creativesolutions.com", Phone = "9876543210", Address = "456 Oak Rd, Pleasantville, NY", Notes = "Enjoys designing user experiences.", IsFav = false },
                    new Contact { Id = 3, Avatar = "https://randomuser.me/api/portraits/men/3.jpg", Title = "Mr.", FirstName = "Michael", MiddleName = "David", LastName = "Johnson", Company = "Fintech Innovations", JobTitle = "Data Scientist", Email = "michael.johnson@fintech.com", Phone = "5555555555", Address = "789 Pine Ave, Cupertino, CA", Notes = "Avid basketball player.", IsFav = false },
                    new Contact { Id = 4, Avatar = "https://randomuser.me/api/portraits/women/4.jpg", Title = "Dr.", FirstName = "Emily", MiddleName = "Rachel", LastName = "Davis", Company = "HealthCare Inc.", JobTitle = "Medical Researcher", Email = "emily.davis@healthcare.com", Phone = "3216549870", Address = "12 Maple St, Boston, MA", Notes = "Loves hiking and outdoor adventures.", IsFav = false },
                    new Contact { Id = 5, Avatar = "https://randomuser.me/api/portraits/men/5.jpg", Title = "Mr.", FirstName = "Christopher", MiddleName = "Luis", LastName = "Martinez", Company = "Martinez Enterprises", JobTitle = "CEO", Email = "christopher.martinez@enterprises.com", Phone = "1112223333", Address = "1010 Sunset Blvd, Los Angeles, CA", Notes = "Business strategist and mentor.", IsFav = false },
                    new Contact { Id = 6, Avatar = "https://randomuser.me/api/portraits/women/6.jpg", Title = "Ms.", FirstName = "Sophia", MiddleName = "Grace", LastName = "Wilson", Company = "NextGen Innovations", JobTitle = "Marketing Director", Email = "sophia.wilson@nextgen.com", Phone = "3334445555", Address = "2020 Elm St, Miami, FL", Notes = "Passionate about digital marketing.", IsFav = false },
                    new Contact { Id = 7, Avatar = "https://randomuser.me/api/portraits/men/7.jpg", Title = "Mr.", FirstName = "William", MiddleName = "James", LastName = "Brown", Company = "Innovation Co.", JobTitle = "CTO", Email = "william.brown@innovationco.com", Phone = "6667778888", Address = "3030 Birch Rd, Seattle, WA", Notes = "Tech enthusiast and avid reader.", IsFav = false },
                    new Contact { Id = 8, Avatar = "https://randomuser.me/api/portraits/women/8.jpg", Title = "Ms.", FirstName = "Olivia", MiddleName = "Isabelle", LastName = "Taylor", Company = "Design Studios", JobTitle = "Creative Director", Email = "olivia.taylor@designstudios.com", Phone = "5556667777", Address = "4040 Cedar Ln, San Francisco, CA", Notes = "Art lover and traveler.", IsFav = false },
                    new Contact { Id = 9, Avatar = "https://randomuser.me/api/portraits/men/9.jpg", Title = "Mr.", FirstName = "James", MiddleName = "Thomas", LastName = "Anderson", Company = "Analytics Corp", JobTitle = "Business Analyst", Email = "james.anderson@analyticscorp.com", Phone = "4445556666", Address = "5050 Redwood St, Denver, CO", Notes = "Football fan and chess player.", IsFav = false },
                    new Contact { Id = 10, Avatar = "https://randomuser.me/api/portraits/women/10.jpg", Title = "Ms.", FirstName = "Lily", MiddleName = "Jane", LastName = "Roberts", Company = "Roberts Consulting", JobTitle = "Consultant", Email = "lily.roberts@consulting.com", Phone = "7778889999", Address = "6060 Pine St, Chicago, IL", Notes = "Yoga enthusiast.", IsFav = false },
                    new Contact { Id = 11, Avatar = "https://randomuser.me/api/portraits/men/11.jpg", Title = "Mr.", FirstName = "Benjamin", MiddleName = "Carlos", LastName = "Lopez", Company = "Lopez Technologies", JobTitle = "Software Developer", Email = "benjamin.lopez@lopeztech.com", Phone = "8889990000", Address = "7070 Maple Rd, Austin, TX", Notes = "Loves photography and technology.", IsFav = false },
                    new Contact { Id = 12, Avatar = "https://randomuser.me/api/portraits/women/12.jpg", Title = "Dr.", FirstName = "Charlotte", MiddleName = "Victoria", LastName = "Miller", Company = "Global Health Org", JobTitle = "Epidemiologist", Email = "charlotte.miller@globalhealth.org", Phone = "2223334444", Address = "8080 Oak Ave, Washington, D.C.", Notes = "Passionate about global health research.", IsFav = false },
                    new Contact { Id = 13, Avatar = "https://randomuser.me/api/portraits/men/13.jpg", Title = "Mr.", FirstName = "Ethan", MiddleName = "Alexander", LastName = "Scott", Company = "Scott Financials", JobTitle = "Financial Analyst", Email = "ethan.scott@scottfinancials.com", Phone = "3334445555", Address = "9090 Birch Ln, New York, NY", Notes = "Enjoys solving complex financial problems.", IsFav = false },
                    new Contact { Id = 14, Avatar = "https://randomuser.me/api/portraits/women/14.jpg", Title = "Ms.", FirstName = "Ava", MiddleName = "Sophia", LastName = "Harris", Company = "Ava Enterprises", JobTitle = "HR Manager", Email = "ava.harris@avaenterprises.com", Phone = "6667778888", Address = "1212 Elm St, Boston, MA", Notes = "Love organizing team-building activities.", IsFav = false },
                    new Contact { Id = 15, Avatar = "https://randomuser.me/api/portraits/men/15.jpg", Title = "Mr.", FirstName = "Lucas", MiddleName = "Henry", LastName = "Walker", Company = "Walker Consulting", JobTitle = "Operations Manager", Email = "lucas.walker@walkerconsulting.com", Phone = "9990001111", Address = "2323 Pine Rd, San Diego, CA", Notes = "Enjoys traveling and exploring new places.", IsFav = false }
                };

                context.Contacts.AddRange(contacts);
                context.SaveChanges();
            }
        }
    }
}
