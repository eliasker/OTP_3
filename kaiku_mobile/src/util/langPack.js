export default (
  [
    /**
     * Finnish
     */
     {
      meta: {
        identifier: 'fi-FI',
        name: 'Suomi',
        alt_name: 'Finnish',
        id: 0
      },
      log_in: 'Kirjaudu sisään',
      password_label: 'Salasana',
      username_label: 'Käyttäjätunnus',
      /** Account page */
      account_title: 'Käyttäjätili',
      settings_title: 'Asetukset',
      change_name_label: 'Vaihda nimi',
      change_password_label: 'Vaihda salasana',
      change_lang_label: 'Kieliasetukset',
      change_lang_desc: 'Valitse kieli. Kielen valinta vaikuttaa vain käyttöliittymän ulkonäköön. Asetuksen vaihtaminen ei vaikuta käyttöjärjestelmään kuten esimerkiksi näppäimistön kielivalintaan.',
      help_label: 'Apua',
      faq_label: 'FAQ',
      contact_label: 'Yhteydenotto',
      faq: [
        {q: 'Mikä on kaiku?', a: 'Kaiku on yksityinen keskustelusovellus.'},
        {q: 'Onko kaiku maksullinen palvelu?', a: 'Sinulle se ei maksa mitään. Laskutamme vain palveluiden ylläpitäjiä, jotta voimme taata tulevaisuudessa palveluiden turvallisuuden ja luotettavuuden.'},
        {q: 'Vastaanotanko samat viestit sekä mobiili- että webpalvelussa?', a: 'Kyllä. Mobiili- ja web-versio toimivat rinnakkain, jotta Kaikun käyttäjät olisivat helpommin saavutettavissa.'},
        {q: 'Mitä teen jos kadotan salasanani?', a: 'Ota yhteyttä palvelun tarjoajaan. Tällä hetkellä sovellus ei tarjoa salasananpalautus lomaketta.'},
        {q: 'Miten luon tunnukset?', a: 'Et voi luoda tunnuksia. Palvelun ylläpitäjä luo tunnukset puolestasi ja lähettää ne sinulle. Jos tarvitset tunnukset, mutta et ole niitä jostain syystä saanut ota yhteyttä palvelun ylläpitäjään.'},
      ],
      contact_mail: 'Sähköposti: asiakaspalvelu@kaiku.com',
      contact_phone: 'Puhelin: +358 9 548 7887',

      change_name_title: 'Nimi asetukset',
      name_desc: 'Nimi auttaa käyttäjiä tunnistamaan sinut. Suosituksena on laittaa koko nimi, jotta muut käyttäjät tunnistaisivat sinut. Käyttäjätunnus on uniikki 3-18 kirjaimen tunnus.',
      name_label: 'Nimi',
      username_label: 'Käyttäjätunnus',
      save_button: 'Tallenna',


      change_password_title: 'Vaihda salasana',
      change_password_desc: 'Salasanan tulee olla vähintään 6 merkkiä pitkä.',
      repassword_label: 'Varmista salasana',

      delete_user_label: 'Poista oma käyttäjä',
      /** Profile page */
      /** Login page */
      /** Dashboard */
    },
    /**
     * English
     */
    {
      meta: {
        identifier: 'en-EN',
        name: 'English',
        alt_name: 'English',
        id: 1
      },
      log_in: 'Log in',
      password_label: 'Password',
      username_label: 'Username',
      /** Account page */
      account_title: 'Account',
      settings_title: 'Settings',
      change_name_label: 'Change name',
      change_password_label: 'Change password',
      change_lang_label: 'Language',
      change_lang_desc: 'Choose language below. This option affects only user interface. Choosing language does not affect your options in operating system for example your input language.',
      help_label: 'Help',
      faq_label: 'FAQ',
      contact_label: 'Contact',
      faq: [
        {q: 'What is kaiku?', a: 'Kaiku is a private chat application.'},
        {q: 'Is payment credential required?', a: 'Kaiku does not cost you a penny. Instead we are billing host of the service to guarantee services reliabilty and security.'},
        {q: 'Do I receive same messages in mobile- and webservices?', a: 'Yes. Mobile- and web applications were designed to work synchronously, so users of Kaiku are even more reachable.'},
        {q: 'What if I forgot login credentials?', a: 'Contact your service host. At this moment application does not have application recover form.'},
        {q: 'How to create an account?', a: 'You can\'t create account. Host of service will create an account and send credentials to you. If you haven\'t receive your credentials please contact your host.'},
      ],
      contact_mail: 'Email: contact@kaiku.com',
      contact_phone: 'Phone: +44 9 548 7887',

      change_name_title: 'Name settings',
      name_desc: 'Name helps others recognize you in app. It is recommended to put full name. Username is unique an unique string consist of 3-18 characters.',
      name_label: 'Name',
      username_label: 'Username',
      save_button: 'Save',

      change_password_title: 'Change password',
      change_password_desc: 'Password should be atleast 6 characters long.',
      repassword_label: 'Repeat password',

      delete_user_label: 'Delete user',
      /** Profile update page */
      /** Chat page */
      /** Help */
      /** Profile page */
      /** Login page */
      /** Dashboard */
    },
    /**
     * Russian
     */
    {
      meta: {
        identifier: 'ru-RU',
        name: 'русский',
        alt_name: 'Russian',
        id: 2
      },
      log_in: 'войти',
      password_label: 'пароль',
      username_label: 'имя пользователя',
      /** Account page */
      account_title: 'аккаунт',
      settings_title: 'настройки',
      change_name_label: 'изменить имя',
      change_password_label: 'изменить пароль',
      change_lang_label: 'выбор языка',
      change_lang_desc: 'Выберите язык снизу.', //TODO: change this
      help_label: 'помощь',
      contact_label: 'контакт',
      faq_label: 'часто задаваемые вопросы',
      faq: [
        {q: 'под работой', a: ':('},
      ],
      contact_mail: 'е-мейл: kontakt@kaiku.com',
      contact_phone: 'телефон: +8 90 548 7887',

      change_name_title: 'настройки имени',
      name_desc: 'Имя помогает другим узнать вас в приложении. Рекомендуем ставить полное имя. Имя пользователя должно быть уникальное. Имя пользователя состоит из 3-18 букв.',
      name_label: 'Имя',
      username_label: 'Имя пользователя',
      save_button: 'сохранить',

      change_password_title: 'Сменить пароль',
      change_password_desc: 'Пароль должен быть длиной не менее 6 символов.',
      repassword_label: 'повторить пароль',

      delete_user_label: 'удалить пользователя',
      /** Profile update page */
      /** Chat page */
      /** Help */
      /** Profile page */
      /** Login page */
      /** Dashboard */
    },
  ]
)