const withImages = require('next-images');
const withPWA  = require("next-pwa")(
    {
      dest: "public"
    }
)

const redirects = {
  async redirects() {
    return [
      {
        source: '/dashboards',
        destination: '/dashboards/tasks',
        permanent: true
      }
    ];
  }
};

// module.exports = withImages(withPWA(redirects));
module.exports = withPWA();
