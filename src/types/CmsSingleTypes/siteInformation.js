// ../types/CmsSingleTypes/siteInformation.js

const siteInfo = {
	logo: {
		data: {
			attributes: {
				url: '/images/logo.jpg', // Path to the logo image
				alternativeText: 'ImmOcean', // Alt text for the logo
			},
		},
	},
	siteName: 'ImmOcean', // The name displayed next to the logo
	navbarItems: [
		{
			label: 'Home',
			url: '/Index',
			visible: true, // Controls whether the item is visible in the navbar
		},
		{
			label: 'Propriétés',
			url: '/properties',
			visible: true,
		},
		{
			label: 'About',
			url: '/about',
			visible: true,
		},
		{
			label: 'Contact',
			url: '/contact',
			visible: true,
		},
		
	],
    footerLeft: "<p>Welcome to our website!</p>",
    realEstateWebsite: "https://example.com",
    headshot: {
        data: {
            attributes: {
                formats: {
                    small: {
                        url: "/images/headshot_small.jpg" // Relative path for small format
                    }
                },
                url: "/images/headshot.jpg", // Relative path for default format
                alternativeText: "Headshot of our team member"
            }
        }
    },
    realEstateLogo: {
        data: {
            attributes: {
                formats: {
                    small: {
                        url: "/images/logo_small.jpg" // Relative path for small format
                    }
                },
                url: "/images/logo.jpg", // Relative path for default format
                alternativeText: "Real estate logo"
            }
        }
    }
}

export default siteInfo;
