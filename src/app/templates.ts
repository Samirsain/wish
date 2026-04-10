export interface Template {
  id: string;
  name: string;
  thumbnail: string;
  mainImage: string;
  wishImage?: string;
  underImage?: string;
}

export interface Category {
  id: string;
  name: string;
  templates: Template[];
}

export const templateData: Record<string, Category> = {
  holi: {
    id: "holi",
    name: "Holi",
    templates: [
      {
        id: "1",
        name: "Colorful Splash",
        thumbnail: "https://media1.tenor.com/m/8lpLmQzloW8AAAAC/happy-holi.gif",
        mainImage: "https://media1.tenor.com/m/8lpLmQzloW8AAAAC/happy-holi.gif",
      },
      {
        id: "2",
        name: "Festive Colors",
        thumbnail: "https://i.pinimg.com/736x/e6/2f/c8/e62fc8407a9e6f090275f0ebb1c5b5e6.jpg",
        mainImage: "https://i.pinimg.com/736x/e6/2f/c8/e62fc8407a9e6f090275f0ebb1c5b5e6.jpg",
      },
      {
        id: "3",
        name: "Magic Holi",
        thumbnail: "https://i.pinimg.com/1200x/b6/10/60/b61060f7c6477bd8f4bb81f2e2b236f1.jpg",
        mainImage: "https://i.pinimg.com/1200x/b6/10/60/b61060f7c6477bd8f4bb81f2e2b236f1.jpg",
      }
    ]
  },
  diwali: {
    id: "diwali",
    name: "Diwali",
    templates: [
      {
        id: "1",
        name: "Glowing Diya",
        thumbnail: "https://media.tenor.com/k6TOp4g6Z7sAAAAi/diwali-sparkles-stars.gif",
        mainImage: "https://media.tenor.com/k6TOp4g6Z7sAAAAi/diwali-sparkles-stars.gif",
      },
      {
        id: "2",
        name: "Grand Fireworks",
        thumbnail: "https://media.tenor.com/reimBXdVHdcAAAAi/happy-diwali-diwali.gif",
        mainImage: "https://media.tenor.com/reimBXdVHdcAAAAi/happy-diwali-diwali.gif",
      },
      {
        id: "3",
        name: "Festival of Lights",
        thumbnail: "https://media.tenor.com/3wgpDdu0rgIAAAAi/happy-diwali-chhota-bheem.gif",
        mainImage: "https://media.tenor.com/3wgpDdu0rgIAAAAi/happy-diwali-chhota-bheem.gif",
      }
    ]
  },
  xmas: {
    id: "xmas",
    name: "Christmas",
    templates: [
      {
        id: "1",
        name: "Classic Christmas",
        thumbnail: "https://i.pinimg.com/1200x/48/89/39/4889395fcfd8d31e9725990c00dec261.jpg",
        mainImage: "https://i.pinimg.com/1200x/48/89/39/4889395fcfd8d31e9725990c00dec261.jpg",
      },
      {
        id: "2",
        name: "Magic Tree",
        thumbnail: "https://i.pinimg.com/1200x/b4/32/4f/b4324f811c616a003e65a8b0b21f2b31.jpg",
        mainImage: "https://i.pinimg.com/1200x/b4/32/4f/b4324f811c616a003e65a8b0b21f2b31.jpg",
      },
      {
        id: "3",
        name: "Golden Peace",
        thumbnail: "https://i.pinimg.com/736x/25/d1/04/25d104249d5f923efb146e45c9c3211c.jpg",
        mainImage: "https://i.pinimg.com/736x/25/d1/04/25d104249d5f923efb146e45c9c3211c.jpg",
      }
    ]
  },
  ny: {
    id: "ny",
    name: "New Year",
    templates: [
      {
        id: "1",
        name: "Fireworks Celebration",
        thumbnail: "https://i.pinimg.com/736x/7a/01/02/7a0102873f497776c46e01453cd0c758.jpg",
        mainImage: "https://i.pinimg.com/736x/7a/01/02/7a0102873f497776c46e01453cd0c758.jpg",
      },
      {
        id: "2",
        name: "Champagne Cheers",
        thumbnail: "https://i.pinimg.com/736x/36/02/b4/3602b40e08fe80da744c6feed1ff4c93.jpg",
        mainImage: "https://i.pinimg.com/736x/36/02/b4/3602b40e08fe80da744c6feed1ff4c93.jpg",
      },
      {
        id: "3",
        name: "Neon Sparks",
        thumbnail: "https://i.pinimg.com/1200x/ba/42/15/ba4215f6eb19ec70c992f011857aba3d.jpg",
        mainImage: "https://i.pinimg.com/1200x/ba/42/15/ba4215f6eb19ec70c992f011857aba3d.jpg",
      }
    ]
  },
  birthday: {
    id: "birthday",
    name: "Birthday",
    templates: [
      {
        id: "1",
        name: "Pink Floral",
        thumbnail: "https://i.pinimg.com/736x/c3/3d/12/c33d123c587793592d93efd5aed258d7.jpg",
        mainImage: "https://i.pinimg.com/736x/c3/3d/12/c33d123c587793592d93efd5aed258d7.jpg",
        underImage: "https://i.pinimg.com/1200x/98/50/51/9850516f37bb476d93673d503c728c95.jpg",
      },
      {
        id: "2",
        name: "Ocean Surfer",
        thumbnail: "https://i.pinimg.com/1200x/1b/53/aa/1b53aa3afa269b5548697e2ba3c4d067.jpg",
        mainImage: "https://i.pinimg.com/1200x/1b/53/aa/1b53aa3afa269b5548697e2ba3c4d067.jpg",
        underImage: "https://i.pinimg.com/1200x/98/50/51/9850516f37bb476d93673d503c728c95.jpg",
      },
      {
        id: "3",
        name: "Birthday Fireworks",
        thumbnail: "https://i.pinimg.com/736x/8a/34/5c/8a345cf3b94687664bf448d9dfb7e2db.jpg",
        mainImage: "https://i.pinimg.com/736x/8a/34/5c/8a345cf3b94687664bf448d9dfb7e2db.jpg",
        underImage: "https://i.pinimg.com/1200x/98/50/51/9850516f37bb476d93673d503c728c95.jpg",
      }
    ]
  }
};
