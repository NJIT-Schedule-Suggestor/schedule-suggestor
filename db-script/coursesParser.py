from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.select import Select
from selenium.webdriver.common.keys import Keys
import os
import time

driver = webdriver.Chrome()

driver.get("https://generalssb-prod.ec.njit.edu/BannerExtensibility/customPage/page/stuRegCrseSched")
time.sleep(3)

dropdown = driver.find_element(By.ID,'pbid-selectBlockTermSelect')
select = Select(dropdown)
select.select_by_visible_text('2023 Spring')
time.sleep(5)

for i in range(0,124):

    spanID = "//span[@id='pbid-subjListTableSubjectLink-"+str(i)+"']/a"
    aTag = driver.find_element(By.XPATH,spanID)
    aTag.click()
    time.sleep(1)
    
    if i>80 and i<84:
        continue

    if i>14:
        aTag.send_keys(Keys.ARROW_DOWN)
        time.sleep(1)

    if i<70 or i>114:
        button = driver.find_element(By.ID,"pbid-courseListSectionExportToExcel")
        button.click()
        time.sleep(2)
    
driver.quit()