/**
 * @author Guocheng Wei <walterwei170@gmail.com>
 * 
 * Easycase
 */

Migrations.add({
    version: 1,
    up: function () {
        // Dummy data for users
        let user_data = {
            username: 'guocheng',
            email: 'wei170@purdue.edu',
            password: '123456a',
            profile: {
                firstname: 'Guocheng',
                lastname: 'Wei'
            }
        }
        const userId = Accounts.createUser(user_data);

        // Dummy data for ec_lawyers
        let lawyer_data = {
            userId: userId,
            name: 'Guocheng Wei',
            gender: 0,
            areas: [
                '13'
            ],
            location: {
                street: '440 S Chauncey Ave',
                city: 'West Lafayette',
                state: 'IN',
                country: 'United States'
            },
            evaluation: 0,
            rate: {
                success: 100
            }
        };
        const lawyerId = Collections.Lawyers.insert(lawyer_data);

        // Dummy data for ec_cases
        let case_data = {
            title: 'The first Easycase law case',
            tags: [
                '1',
                '13'
            ],
            content: 'This is the first law case has even been on Easycase',
            payment: 1,
            createdBy: userId,
            languages: [
                'EN', 'CH'
            ],
            location: {
                street: '440 S Chauncey Ave',
                city: 'West Lafayette',
                state: 'IN',
                country: 'United States'
            },
            createdAt: new Date()
        }
        const caseId = Collections.Cases.insert(case_data);

        // Dummy data for ec_contracts		
        let contract_data = {
            contractee: userId,
            contractor: lawyerId,
            caseId: caseId
        }
        const contractId = Collections.Contracts.insert(contract_data);

        // Dummy data for ec_cases_blogs
        let blogs_data = [
            {
                caseId: caseId,
                createdBy: {
                    authorId: lawyerId,
                    role: 'lawyer'
                },
                content: 'Test Lawyer Blog'
            },
            {
                caseId: caseId,
                createdBy: {
                    authorId: userId,
                    role: 'user'
                },
                content: 'Test Blog',
            }
        ];

        blogs_data.forEach(function(blog) {
            Collections.CasesBlogs.insert(blog);
        });
    },
    down: function () {
        Collections.Lawyers.remove({});
        Collections.Contracts.remove({});
        Collections.Cases.remove({});
        Collections.CasesBlogs.remove({});
        Meteor.users.remove({});
    }
});