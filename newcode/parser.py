import sys
import mysql.connector
import xml.dom.minidom as domApi

try:
    cnx = mysql.connector.connect(host='localhost', user='root', password='Cs288005!', database='cs288')
    cursor = cnx.cursor()
except mysql.connector.Error as err:
    print(err)

def insert(cursor,vendor,sku,name,description,price,RemImgUrl,LocImgUrl,reviewScore):
    query = 'INSERT INTO '+vendor+'(SKU,ProductName,ProductDesc,ProductPrice,RemImgUrl,LocImgUrl,ReviewScore) VALUES (%s,%s,%s,%s,%s,%s,%s)'
    cursor.execute(query, (sku,name,description,price,RemImgUrl,LocImgUrl,reviewScore))

def update(cursor,vendor,sku,name,description,price,RemImgUrl,LocImgUrl,reviewScore):
    query = 'UPDATE '+vendor+' SET `ProductName`=%s,`ProductDesc`=%s,`ProductPrice`=%s,`RemImgUrl`=%s,`LocImgUrl`=%s,`ReviewScore`=%s WHERE SKU = %s'
    cursor.execute(query, (name,description,price,RemImgUrl,LocImgUrl,reviewScore,sku))

if sys.argv[1] == "vivid":

    doc = domApi.parse(sys.argv[2])

    titleElements = doc.getElementsByTagName("title")
    title = titleElements[0].childNodes[0].nodeValue
    sku = title.split("  | ")[1]
    name = title.split("  | ")[0]

    description = ""
    divs = doc.getElementsByTagName("div")
    for div in divs:
        divId = div.getAttribute("id")
        if divId == "productDescription":
            pTags = div.getElementsByTagName("p")
            for pTag in pTags:
                if len(pTag.childNodes)>1:
                    for node in pTag.childNodes:
                        if node.nodeType == node.TEXT_NODE:
                            description += node.nodeValue
                    break
                else:
                    for node in pTag.childNodes:
                        if node.nodeType == node.TEXT_NODE:
                            description += node.nodeValue
            break

    priceElement = doc.getElementsByTagName("p")[1]
    price = ""
    if len(priceElement.childNodes)==1:
        price = priceElement.childNodes[0].nodeValue
        price = price.replace('$','')
        price = price.replace(',','')
    else:
        priceElement = doc.getElementsByTagName("span")[9]
        price = priceElement.childNodes[0].nodeValue
        price = price.replace('Sale:$','')
        price = price.replace(',','')
    price = float(price)

    RemImgUrl = ""
    aTags = doc.getElementsByTagName("a")
    for aTag in aTags:
        if aTag.getAttribute('title')[:13] == "Product Image":
            RemImgUrl = aTag.getAttribute('href')
            break

    LocImgUrl = "/Images/vivid/"+sku+"_vivid.jpg"

    reviewScore = 0.0

    if sys.argv[3] == "insert":
        insert(cursor,'vivid',sku,name,description,price,RemImgUrl,LocImgUrl,reviewScore)
        cnx.commit()
    elif sys.argv[3] == "update":
        update(cursor,'vivid',sku,name,description,price,RemImgUrl,LocImgUrl,reviewScore)
        cnx.commit()

if sys.argv[1] == "lmp":

    doc = domApi.parse(sys.argv[2])

    titleElement = doc.getElementsByTagName("title")
    title = titleElement[0].childNodes[0].nodeValue
    sku = title.split(" - ")[1]
    name = title.split(" - ")[0]

    description = ""
    divs = doc.getElementsByTagName("div")
    for div in divs:
        divClass = div.getAttribute("class")
        if divClass == "show_des border_box":
            pTags = div.getElementsByTagName("p")
            for pTag in pTags:
                for node in pTag.childNodes:
                    if node.nodeType == node.TEXT_NODE:
                        description += node.nodeValue
            break

    spanTags = doc.getElementsByTagName("span")
    price = ""
    for spanTag in spanTags:
        spanClass = spanTag.getAttribute("class")
        if spanClass == ".list_price":
            price = spanTag.childNodes[0].nodeValue
            price = price.replace('$','')
            price = price.replace(',','')
            break
    price = float(price)

    RemImgUrl = ""
    imgTags = doc.getElementsByTagName("img")
    for imgTag in imgTags:
        if imgTag.getAttribute('id') == "imgDisp":
            RemImgUrl = imgTag.getAttribute('src')
            break

    LocImgUrl = "/Images/lmp/"+sku+"_lmp.jpg"

    reviewScore = 0.0

    if sys.argv[3] == "insert":
        insert(cursor,'lmp',sku,name,description,price,RemImgUrl,LocImgUrl,reviewScore)
        cnx.commit()
    elif sys.argv[3] == "update":
        update(cursor,'lmp',sku,name,description,price,RemImgUrl,LocImgUrl,reviewScore)
        cnx.commit()

cursor.close()
cnx.close()