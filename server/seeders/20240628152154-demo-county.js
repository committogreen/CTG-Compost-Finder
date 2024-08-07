module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('counties', [
      {
        id: 1,
        name: 'Queens',
        
        city: "New York City",
        state: "New York",
        pickUp: 'https://www.nyc.gov/assets/dsny/forms/collection-schedule',
        comLaw: 'https://policyfinder.refed.org/new-york/#organic-waste',
        resLaw: 'https://portal.311.nyc.gov/article/?kanumber=KA-02030#:~:text=The%20Department%20of%20Sanitation%20(DSNY,up%20is%20required%20for%20service.'
      },
      {
        id: 2,
        name: 'New York',
        city: "New York City",
        state: "New York",
        
        pickUp: 'https://www.nyc.gov/assets/dsny/forms/collection-schedule',
        comLaw: 'https://policyfinder.refed.org/new-york/#organic-waste',
        resLaw: 'https://portal.311.nyc.gov/article/?kanumber=KA-02030#:~:text=The%20Department%20of%20Sanitation%20(DSNY,up%20is%20required%20for%20service.'
      },
      {
        id: 3,
        name: 'Brooklyn',
        city: "New York City",
        state: "New York",
       
        pickUp: 'https://www.nyc.gov/assets/dsny/forms/collection-schedule',
        comLaw: 'https://policyfinder.refed.org/new-york/#organic-waste',
        resLaw: 'https://portal.311.nyc.gov/article/?kanumber=KA-02030#:~:text=The%20Department%20of%20Sanitation%20(DSNY,up%20is%20required%20for%20service.'
      },
      {
        id: 4,
        name: 'Bronx',
        city: "New York City",
        state: "New York",
     
        pickUp: 'https://www.nyc.gov/assets/dsny/forms/collection-schedule',
        comLaw: 'https://policyfinder.refed.org/new-york/#organic-waste',
        resLaw: 'https://portal.311.nyc.gov/article/?kanumber=KA-02030#:~:text=The%20Department%20of%20Sanitation%20(DSNY,up%20is%20required%20for%20service.'
      },
      {
        id: 5,
        name: 'Staten Island',
        city: "New York City",
        state: "New York",
        
        pickUp: 'https://www.nyc.gov/assets/dsny/forms/collection-schedule',
        comLaw: 'https://policyfinder.refed.org/new-york/#organic-waste',
        resLaw: 'https://portal.311.nyc.gov/article/?kanumber=KA-02030#:~:text=The%20Department%20of%20Sanitation%20(DSNY,up%20is%20required%20for%20service.'
      },
      {
        id: 6,
        name: 'King',
        city: "Seattle",
        state: "Washington",

        pickUp: 'https://myutilities.seattle.gov/eportal/#/accountlookup/calendar',
        comLaw: 'https://policyfinder.refed.org/washington/',
        resLaw: 'https://library.municode.com/wa/seattle/codes/municipal_code?nodeId=TIT21UT_SUBTITLE_IIISOWA_CH21.36SOWACO_SUBCHAPTER_IISOWACO_21.36.085COWAPR '
      },
      {
        id: 7,
        name: 'Douglas',
        city: "Omaha",
        state: "Nebraska",

        pickUp: 'no',
        comLaw: 'no',
        resLaw: 'no'
      },
      

    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('counties', null, {});
  },
};