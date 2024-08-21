package database

import (
	"log"
	"os"
	"time"

	"github.com/vijaymehrotra/blog/model"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DBConn *gorm.DB

func ConnectDB() {
	host := os.Getenv("db_host")
	user := os.Getenv("db_user")
	password := os.Getenv("db_password")
	dbname := os.Getenv("db_name")

	dsn := user + ":" + password + "@tcp(" + host + ":3306)/" + dbname + "?charset=utf8mb4&parseTime=True&loc=Local"

	var db *gorm.DB
	var err error
	for i := 0; i < 5; i++ {
		db , err = gorm.Open(mysql.Open(dsn),&gorm.Config{
			Logger: logger.Default.LogMode(logger.Error),
		})
		if err == nil {
			break
		}
		log.Println("Retrying to connect to Database .. ")
		time.Sleep(2 * time.Second)
	}

	if err != nil {
		panic("Failed to Connect to Database")
	}
	log.Println("Connection SuccessFul .. ")

	db.AutoMigrate(new(model.Blog))

	DBConn = db
}