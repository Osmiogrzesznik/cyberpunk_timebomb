----
-- phpLiteAdmin database dump (http://www.phpliteadmin.org/)
-- phpLiteAdmin version: 1.9.7.1
-- Exported: 10:12pm on August 19, 2019 (CEST)
-- database file: .\rafka_timebomb.sqlite
----
BEGIN TRANSACTION;

----
-- Drop table for effect
----
DROP TABLE IF EXISTS "effect";

----
-- Table structure for effect
----
CREATE TABLE "effect" (
	"effect_id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"effect_name"	TEXT NOT NULL,
	"effect_description"	TEXT,
	"effect_destroys_types"	TEXT,
	"effect_interference"	integer,
	"effect_radioactivity"	integer
);

----
-- Data dump for effect, a total of 2 rows
----
INSERT INTO "effect" ("effect_id","effect_name","effect_description","effect_destroys_types","effect_interference","effect_radioactivity") VALUES ('1','High Radiation','Dead Zone. Earth is almost glowing. Only mutants 
   AND alike can survive. This effect can kill a human being, AND damage devices.','Human, Radar, Food','10','10');
INSERT INTO "effect" ("effect_id","effect_name","effect_description","effect_destroys_types","effect_interference","effect_radioactivity") VALUES ('2','Medium Radiation','fodfndovndv vpdvpdksfdsf','','5','5');

----
-- Drop table for mapentity
----
DROP TABLE IF EXISTS "mapentity";

----
-- Table structure for mapentity
----
CREATE TABLE mapentity (
        mapentity_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        mapentity_effect_id_fk integer not null,
        mapentity_effect_on BOOLEAN,
        user_id_fk integer not null,
        mapentity_name TEXT NOT NULL,
        mapentity_description TEXT,
        mapentity_style text,
        mapentity_geometrytype varchar(16) not null,
        mapentity_center DECIMAL,
        mapentity_radius DECIMAL,
        mapentity_geometry_json text,
        CONSTRAINT fk_user
        FOREIGN KEY(user_id_fk) 
        REFERENCES user (user_id)
        ON DELETE CASCADE
        CONSTRAINT fk_effect
        FOREIGN KEY(mapentity_effect_id_fk) 
        REFERENCES effect (effect_id)
        ON DELETE CASCADE
                      );

----
-- Data dump for mapentity, a total of 0 rows
----

----
-- Drop table for mapentity_point
----
DROP TABLE IF EXISTS "mapentity_point";

----
-- Table structure for mapentity_point
----
CREATE TABLE mapentity_point (
        point_fk_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        mapentity_fk_id INTEGER NOT NULL,
        point_location varchar(255),
        CONSTRAINT fk_mapentity_id,
        FOREIGN KEY(mapentity_fk_id) 
        REFERENCES mapentity (mapentity_id)
        ON DELETE CASCADE,

CONSTRAINT fk_point_id,
        FOREIGN KEY(point_fk_id) 
        REFERENCES point (point_id)
        ON DELETE CASCADE

  CONSTRAINT fk_mapentity_id,
        FOREIGN KEY(mapentity_fk_id) 
        REFERENCES point (mapentity_id)
        ON DELETE CASCADE
                      );

----
-- Data dump for mapentity_point, a total of 0 rows
----

----
-- Drop table for device
----
DROP TABLE IF EXISTS "device";

----
-- Table structure for device
----
CREATE TABLE device ( 
       device_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
       user_id_fk integer not null,
       device_session_id TEXT NOT NULL,
       device_name TEXT NOT NULL,
       device_description TEXT,
       device_ip TEXT NOT NULL,
       time_last_active DATETIME NOT NULL,
       timebomb_status TEXT,
       device_location varchar(255),
       device_fk_location_point INTEGER,

CONSTRAINT fk_location_point,
        FOREIGN KEY(device_fk_location_point) 
        REFERENCES point (point_id)
        ON DELETE CASCADE,
       
        CONSTRAINT fk_user
        FOREIGN KEY(user_id_fk) 
        REFERENCES user (user_id)
        ON DELETE CASCADE
                      );

----
-- Data dump for device, a total of 0 rows
----

----
-- Drop table for functionality
----
DROP TABLE IF EXISTS "functionality";

----
-- Table structure for functionality
----
CREATE TABLE functionality (
        functionality_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        functionality_folder TEXT NOT NULL,
        functionality_name TEXTuniq_index not null,
        functionality_battery_depletion integer 
        );

----
-- Data dump for functionality, a total of 0 rows
----

----
-- Drop table for timebomb
----
DROP TABLE IF EXISTS "timebomb";

----
-- Table structure for timebomb
----
CREATE TABLE timebomb (
  timebomb_device_id_fk integer not null,
  timebomb_status TEXT,
  timebomb_timebomb_time_set varchar(19),
  timebomb_mapentity_id_fk integer not null,
  timebomb_password TEXT NOT NULL
  );

----
-- Data dump for timebomb, a total of 0 rows
----

----
-- Drop table for geiger
----
DROP TABLE IF EXISTS "geiger";

----
-- Table structure for geiger
----
CREATE TABLE geiger (
  geiger_device_id_fk integer not null,
  geiger_on boolean not null,
  geiger_status TEXT
  );

----
-- Data dump for geiger, a total of 0 rows
----

----
-- Drop table for radar
----
DROP TABLE IF EXISTS "radar";

----
-- Table structure for radar
----
CREATE TABLE radar (
  radar_device_id_fk integer not null,
  radar_on boolean not null,
  radar_status TEXT,
  radar_radius integer
  );

----
-- Data dump for radar, a total of 0 rows
----

----
-- Drop table for inventory
----
DROP TABLE IF EXISTS "inventory";

----
-- Table structure for inventory
----
CREATE TABLE inventory (
  inventory_device_id_fk integer not null,
  inventory_on boolean not null,
  inventory_status TEXT,
  inventory_itemsJSON TEXT
  );

----
-- Data dump for inventory, a total of 0 rows
----

----
-- Drop table for functionality_device
----
DROP TABLE IF EXISTS "functionality_device";

----
-- Table structure for functionality_device
----
CREATE TABLE functionality_device (
        functionality_id_fk INTEGER not null,
        added_by_device_id_fk integer,
        device_id_fk TEXT NOT NULL,
        functionality_status TEXT,
        settings_JSON TEXT,
        time_added varchar(19) NOT NULL,

CONSTRAINT fk_functionality_id,
        FOREIGN KEY( functionality_id_fk)
        REFERENCES functionality (functionality_id)
        ON DELETE CASCADE,
       
      CONSTRAINT fk_device_func
        FOREIGN KEY (device_id_fk) 
        REFERENCES device (device_id)
        ON DELETE CASCADE 
);

----
-- Data dump for functionality_device, a total of 0 rows
----

----
-- Drop table for mapentity_device
----
DROP TABLE IF EXISTS "mapentity_device";

----
-- Table structure for mapentity_device
----
CREATE TABLE mapentity_device (
        mapentity_id_fk INTEGER not null,
        device_id_fk TEXT NOT NULL,
        mapentity_status TEXT,
        time_added varchar(19) NOT NULL,

CONSTRAINT fk_mapentity_id,
        FOREIGN KEY( mapentity_id_fk)
        REFERENCES mapentity (mapentity_id)
ON DELETE CASCADE,
       
      CONSTRAINT fk_device_func
        FOREIGN KEY (device_id_fk) 
        REFERENCES device (device_id)
        ON DELETE CASCADE 
);

----
-- Data dump for mapentity_device, a total of 0 rows
----

----
-- Drop table for history_device_location
----
DROP TABLE IF EXISTS "history_device_location";

----
-- Table structure for history_device_location
----
CREATE TABLE history_device_location (
        history_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        history_device_id INTEGER NOT NULL,
        history_time_last_active DATETIME NOT NULL ,
        history_device_location varchar(128) NOT NULL,
        CONSTRAINT fk_device
        FOREIGN KEY(history_device_id) 
        REFERENCES device (device_id)
        ON DELETE CASCADE
                      );

----
-- Data dump for history_device_location, a total of 0 rows
----

----
-- Drop table for point
----
DROP TABLE IF EXISTS "point";

----
-- Table structure for point
----
CREATE TABLE point ( point_id INTEGER PRIMARY KEY,
       point_longitude text not null,
       point_latitude text not null );

----
-- Data dump for point, a total of 0 rows
----

----
-- Drop table for user
----
DROP TABLE IF EXISTS "user";

----
-- Table structure for user
----
CREATE TABLE user (
        user_id INTEGER PRIMARY KEY,
        user_ip varchar(64) NOT NULL,
        user_name varchar(64) NOT NULL,
        user_password_hash varchar(255) NOT NULL,
        user_timezone varchar(64) NOT NULL,
        user_location varchar(255),
        user_fk_location_point INTEGER,
        user_map_srv INTEGER NOT NULL DEFAULT 0,
user_green_filter boolean  not null default 1,

CONSTRAINT fk_location_point,
        FOREIGN KEY(user_fk_location_point) 
        REFERENCES point (point_id)
        ON DELETE CASCADE
        );

----
-- Data dump for user, a total of 0 rows
----

----
-- Drop table for drawnfeature3
----
DROP TABLE IF EXISTS "drawnfeature3";

----
-- Table structure for drawnfeature3
----
CREATE TABLE drawnfeature3 (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
       creator_fk integer,
       creator integer not null,
       name TEXT,
       description TEXT,
       type varchar(16),
       geometryjson TEXT,
       effect_FK integer,
       color TEXT,
       pseudo_id TEXT not null);

----
-- Data dump for drawnfeature3, a total of 0 rows
----

----
-- Drop index for device_ip_UNIQUE
----
DROP INDEX IF EXISTS "device_ip_UNIQUE";

----
-- structure for index device_ip_UNIQUE on table device
----
CREATE UNIQUE INDEX device_ip_UNIQUE ON device ( device_ip ASC);

----
-- Drop index for device_session_id_UNIQUE
----
DROP INDEX IF EXISTS "device_session_id_UNIQUE";

----
-- structure for index device_session_id_UNIQUE on table device
----
CREATE UNIQUE INDEX device_session_id_UNIQUE ON device ( device_session_id ASC);

----
-- Drop index for user_name_UNIQUE
----
DROP INDEX IF EXISTS "user_name_UNIQUE";

----
-- structure for index user_name_UNIQUE on table user
----
CREATE UNIQUE INDEX user_name_UNIQUE ON user (user_name ASC);
COMMIT;