from selenium import webdriver
from selenium.webdriver.common.by import By
import os
import time

driver = webdriver.Chrome()

driver.get("https://generalssb-prod.ec.njit.edu/BannerExtensibility/customPage/page/stuRegCrseSched")

time.sleep(5)

for i in range(97):

    if i!=0:
        
        spanID = "//span[@id='pbid-subjListTableSubjectLink-"+str(i)+"']/a"
        aTag = driver.find_element(By.XPATH,spanID)
        aTag.click()
        time.sleep(2)

    button = driver.find_element(By.ID,"pbid-courseListSectionExportToExcel")
    button.click()

    time.sleep(2)

    download_path = "/home/cs288/Downloads"
    filename = max([download_path + "/" + f for f in os.listdir(download_path)], key=os.path.getctime)

    import shutil
    shutil.move(filename, "/home/cs288/Desktop/schedule-suggestor-project/schedule-suggestor/newcode")

driver.quit()