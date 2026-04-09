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
        thumbnail: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDM3bjJqNHQxc3o0cnE5bDAxZHNmMHgwZzN1bnJ4NnJkcmFhMHI3MiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/qTRQqGHTnrFNpdbA58/giphy.webp",
        mainImage: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDM3bjJqNHQxc3o0cnE5bDAxZHNmMHgwZzN1bnJ4NnJkcmFhMHI3MiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/qTRQqGHTnrFNpdbA58/giphy.webp",
      },
      {
        id: "2",
        name: "Festive Colors",
        thumbnail: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHZvdzZuYTZzYnJhZHgxMzdlYWRvYmhyNmk4bjEzejBuYWxvNXllOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/OOhzkYfIpQTZSCd0Lb/giphy.gif",
        mainImage: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHZvdzZuYTZzYnJhZHgxMzdlYWRvYmhyNmk4bjEzejBuYWxvNXllOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/OOhzkYfIpQTZSCd0Lb/giphy.gif",
      },
      {
        id: "3",
        name: "Magic Holi",
        thumbnail: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHdzZzJ0OGhqaXRzOG11dzJoN2dudjg5ZXpqbmhvNnlwYXMzb2NscCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/0diRmZwwQU45nfpXwv/giphy.gif",
        mainImage: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHdzZzJ0OGhqaXRzOG11dzJoN2dudjg5ZXpqbmhvNnlwYXMzb2NscCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/0diRmZwwQU45nfpXwv/giphy.gif",
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
        thumbnail: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmFwZXZsb3phNmpvODl1eW4xa3FncGVvOTEyMjZ5aDh4YzM2eGNmbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4mfNIJciAvY6zpTxOk/giphy.gif",
        mainImage: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmFwZXZsb3phNmpvODl1eW4xa3FncGVvOTEyMjZ5aDh4YzM2eGNmbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4mfNIJciAvY6zpTxOk/giphy.gif",
      },
      {
        id: "2",
        name: "Grand Fireworks",
        thumbnail: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXBpeG90MDVmeGI4NDVyaHN6angyOWNiYzdrMmZ2d2F6M3pudWVreiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lWEc3DL3zAMQ8FsxvY/giphy.gif",
        mainImage: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXBpeG90MDVmeGI4NDVyaHN6angyOWNiYzdrMmZ2d2F6M3pudWVreiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lWEc3DL3zAMQ8FsxvY/giphy.gif",
      },
      {
        id: "3",
        name: "Festival of Lights",
        thumbnail: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZW16dTZ3ZXdpN3R5ZmQ3YTV2MWg4eTIyM2V4MjN6YXdhMDczanFtayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1o50tZCj42LzVha7Uc/giphy.gif",
        mainImage: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZW16dTZ3ZXdpN3R5ZmQ3YTV2MWg4eTIyM2V4MjN6YXdhMDczanFtayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1o50tZCj42LzVha7Uc/giphy.gif",
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
        thumbnail: "https://bestanimations.com/media/christmas/1321601163wishing-you-a-very-merry-christmas-and-happy-new-year-animated-gif-image.gif",
        mainImage: "https://bestanimations.com/media/christmas/1321601163wishing-you-a-very-merry-christmas-and-happy-new-year-animated-gif-image.gif",
      },
      {
        id: "2",
        name: "Magic Tree",
        thumbnail: "https://bestanimations.com/media/christmas/1915682704merry-christmas-gif-christmas-tree-snow-animation-greetings.gif.pagespeed.ce.azvtZGWvQ4.gif",
        mainImage: "https://bestanimations.com/media/christmas/1915682704merry-christmas-gif-christmas-tree-snow-animation-greetings.gif.pagespeed.ce.azvtZGWvQ4.gif",
      },
      {
        id: "3",
        name: "Golden Peace",
        thumbnail: "https://bestanimations.com/media/christmas/485660006gold-merry-christmas-gif-peace-to-world-animated.gif.pagespeed.ce.VtiQGWi59x.gif",
        mainImage: "https://bestanimations.com/media/christmas/485660006gold-merry-christmas-gif-peace-to-world-animated.gif.pagespeed.ce.VtiQGWi59x.gif",
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
        thumbnail: "https://bestanimations.com/uploads/gifs/1215101805colorful-fan-firework-gif-happy-new-year-gif.gif.pagespeed.ce.959CRFxArj.gif",
        mainImage: "https://bestanimations.com/uploads/gifs/1215101805colorful-fan-firework-gif-happy-new-year-gif.gif.pagespeed.ce.959CRFxArj.gif",
      },
      {
        id: "2",
        name: "Champagne Cheers",
        thumbnail: "https://bestanimations.com/uploads/gifs/626891354cheer-to-new-year-gif-animation-champagne-glasses.gif.pagespeed.ce.aC7C5-iWdL.gif",
        mainImage: "https://bestanimations.com/uploads/gifs/626891354cheer-to-new-year-gif-animation-champagne-glasses.gif.pagespeed.ce.aC7C5-iWdL.gif",
      },
      {
        id: "3",
        name: "Neon Sparks",
        thumbnail: "https://bestanimations.com/media/newyear/328918394happy-new-year-gif-neon-sparkling-lights-animated.gif",
        mainImage: "https://bestanimations.com/media/newyear/328918394happy-new-year-gif-neon-sparkling-lights-animated.gif",
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
        thumbnail: "https://bestanimations.com/media/birthday/1826060412happy-birthday-pink-flower-gif.gif",
        mainImage: "https://bestanimations.com/media/birthday/1826060412happy-birthday-pink-flower-gif.gif",
      },
      {
        id: "2",
        name: "Ocean Surfer",
        thumbnail: "https://bestanimations.com/media/birthday/1726946915happy-birthday-gif-ocean-waves-surfer-birthday.gif.pagespeed.ce.6WvF7HZ3YS.gif",
        mainImage: "https://bestanimations.com/media/birthday/1726946915happy-birthday-gif-ocean-waves-surfer-birthday.gif.pagespeed.ce.6WvF7HZ3YS.gif",
      },
      {
        id: "3",
        name: "Birthday Fireworks",
        thumbnail: "https://bestanimations.com/media/birthday/1523761387wishing-you-happy-birthday-gif-fireworks-animated.gif",
        mainImage: "https://bestanimations.com/media/birthday/1523761387wishing-you-happy-birthday-gif-fireworks-animated.gif",
      }
    ]
  }
};
