export default {
  pages: [
    {
      id: "home",
      title: "Home",
      template: "hero",
      content: {
        heading: "Tigers",
        subheading: "Majestic Predators of the Wild",
        cta_text: "Explore Now",
        image: "https://picsum.photos/1200/600?random=1"
      }
    },
    {
      id: "about",
      title: "About Tigers",
      template: "section",
      content: {
        heading: "About Tigers",
        description: "Tigers are the largest living cats and among the most recognizable animals in the world.",
        image: "https://picsum.photos/600/400?random=2",
        sections: [
          {
            title: "Physical Characteristics",
            text: "Tigers are massive carnivores with a distinctive orange coat and black stripes. They can weigh up to 300 kg (660 lbs) and reach lengths of 3.3 meters (11 feet). Each tiger has a unique stripe pattern, like a fingerprint."
          },
          {
            title: "Habitat",
            text: "Tigers are found primarily in Asia, inhabiting dense forests, grasslands, and mangrove swamps. They prefer areas with abundant prey and water sources."
          }
        ]
      }
    },
    {
      id: "species",
      title: "Tiger Species",
      template: "grid",
      content: {
        heading: "Tiger Subspecies",
        description: "Six subspecies of tigers exist today, each adapted to their specific environment.",
        items: [
          {
            name: "Bengal Tiger",
            description: "The most common subspecies found in India and Bangladesh",
            image: "https://picsum.photos/400/300?random=3"
          },
          {
            name: "Siberian Tiger",
            description: "The largest subspecies, found in far eastern Russia and northern China",
            image: "https://picsum.photos/400/300?random=4"
          },
          {
            name: "Sumatran Tiger",
            description: "The smallest subspecies, critically endangered and found in Indonesia",
            image: "https://picsum.photos/400/300?random=5"
          },
          {
            name: "Malayan Tiger",
            description: "Found in Malaysia and southern Thailand",
            image: "https://picsum.photos/400/300?random=6"
          },
          {
            name: "Indochinese Tiger",
            description: "Found across Southeast Asia",
            image: "https://picsum.photos/400/300?random=7"
          },
          {
            name: "South China Tiger",
            description: "Critically endangered subspecies with fewer than 30 individuals in the wild",
            image: "https://picsum.photos/400/300?random=8"
          }
        ]
      }
    },
    {
      id: "behavior",
      title: "Behavior & Hunting",
      template: "section",
      content: {
        heading: "Tiger Behavior",
        description: "Tigers are solitary, primarily nocturnal hunters with remarkable predatory skills.",
        image: "https://picsum.photos/600/400?random=9",
        sections: [
          {
            title: "Hunting Techniques",
            text: "Tigers are apex predators that hunt alone using stealth and ambush tactics. They can run up to 60 km/h and leap distances of 9 meters. A tiger needs to hunt successfully once every 10-15 days."
          },
          {
            title: "Social Structure",
            text: "Unlike other big cats, tigers are solitary animals with distinct territories. Males maintain larger territories that may overlap with multiple females' ranges. They communicate through roars that can be heard up to 3 km away."
          }
        ]
      }
    },
    {
      id: "conservation",
      title: "Conservation",
      template: "section",
      content: {
        heading: "Tiger Conservation",
        description: "Tiger populations face severe threats from habitat loss, poaching, and human-wildlife conflict.",
        image: "https://picsum.photos/600/400?random=10",
        sections: [
          {
            title: "Threats",
            text: "Tiger populations have declined by over 95% in the last century. Major threats include poaching for traditional medicine and pelts, habitat fragmentation, and declining prey populations."
          },
          {
            title: "Conservation Efforts",
            text: "International efforts like the Global Tiger Initiative work to protect remaining populations through habitat conservation, anti-poaching programs, and breeding initiatives. Several countries have made significant progress in increasing tiger numbers."
          }
        ]
      }
    },
    {
      id: "contact",
      title: "Get Involved",
      template: "contact",
      content: {
        heading: "Support Tiger Conservation",
        description: "Learn how you can help protect these magnificent creatures",
        cta_text: "Join Us"
      }
    }
  ]
};
