<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'bokeefe_wp3');

/** MySQL database username */
define('DB_USER', 'bokeefe_wp3');

/** MySQL database password */
define('DB_PASSWORD', 'I~c5##T48kke1EpD0c(67(#0');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'cS35Q5nSEUYHMc39KCiONdtMETHpAc1dVUO6h1sdhh7dtftjM6d64ACB5L40lnWU');
define('SECURE_AUTH_KEY',  'JM6bpuTQ4R8GSbT6vxlD4sE0VB2SojKI79hO1KbN89oo1beILHqem3VooucWsz01');
define('LOGGED_IN_KEY',    'ynqOnVmZD6mvkGhqKLoT3cgaxGd5AWj2CWv1yKXvpZoaLUMHwEN6L56ilPxbSbiM');
define('NONCE_KEY',        '4dfMJI6AtmDUotSFIC6EgIR5wwFRVfcI5maDxrvuI2eh4VW8pNfdsoaMyc1KQ0C4');
define('AUTH_SALT',        'BM7rFYYscDzOKJb5dZdRQZHSDS4aPsAqMQiz0ZhDMVOg6Mc9LYSW4VXZBtEVwzGx');
define('SECURE_AUTH_SALT', 'i1TEt6fDoGAgQI8ZVIizXwRnEHDtkiHrnkrajkIbSTIvugfYXE1LHmjDG1hDqwea');
define('LOGGED_IN_SALT',   'VavzO3HLf3p2fgNGyYzjkeaqBRBFp2NFSOMFYs2NbXtnN6SVlRVnex6ROokh0EKT');
define('NONCE_SALT',       'A4c9lOFPQDTGNstt8o9j2ONc3Gz4oEIPCmnt2vnpesq7vQV0YctTxbEdRtzWO2Qj');

/**
 * Other customizations.
 */
define('FS_METHOD','direct');define('FS_CHMOD_DIR',0755);define('FS_CHMOD_FILE',0644);
define('WP_TEMP_DIR',dirname(__FILE__).'/wp-content/uploads');

/**
 * Turn off automatic updates since these are managed upstream.
 */
define('AUTOMATIC_UPDATER_DISABLED', true);


/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
