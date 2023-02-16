from selenium import webdriver
from selenium.webdriver.common.by import By
import os
import time

driver = webdriver.Chrome()

driver.get("https://generalssb-prod.ec.njit.edu/BannerExtensibility/customPage/page/stuRegCrseSched")

time.sleep(3)

button = driver.find_element(By.ID,"pbid-courseListSectionExportToExcel")
button.click()
time.sleep(2)

for i in range(1,97):

    spanID = "//span[@id='pbid-subjListTableSubjectLink-"+str(i)+"']/a"
    aTag = driver.find_element(By.XPATH,spanID)
    aTag.click()
    time.sleep(2)

    button = driver.find_element(By.ID,"pbid-courseListSectionExportToExcel")
    button.click()
    time.sleep(2)


driver.quit()