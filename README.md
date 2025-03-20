# frontend-T-W

## Deployment Guide

### ขั้นตอนการ Deploy บน IIS

1. **Build โปรเจค**

   ```sh
   npm run build
   ```

   หลังจากรันคำสั่งนี้ ระบบจะสร้างโฟลเดอร์ `dist` ซึ่งเป็นไฟล์ที่พร้อมใช้งานบน IIS

2. \*\*เพิ่มไฟล์ ****`web.config`**** ภายในโฟลเดอร์ \*\***`dist`**
   ให้สร้างไฟล์ `web.config` และใส่โค้ดต่อไปนี้เพื่อให้ IIS สามารถรองรับ React SPA:

   ```xml
   <?xml version="1.0" encoding="utf-8"?>
   <configuration>
       <system.webServer>
           <rewrite>
               <rules>
                   <!-- กฎนี้จะทำให้ IIS เปลี่ยนเส้นทางไปที่ index.html ถ้าไม่มีไฟล์ที่ร้องขอ -->
                   <rule name="React SPA" stopProcessing="true">
                       <match url=".*" />
                       <conditions>
                           <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
                           <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
                       </conditions>
                       <action type="Rewrite" url="/index.html" />
                   </rule>
               </rules>
           </rewrite>
       </system.webServer>
   </configuration>
   ```

3. **ตั้งค่า IIS**

   - เปิด IIS Manager
   - เพิ่ม **เว็บไซต์ใหม่** หรือ **Application** ชี้ไปที่โฟลเดอร์ `dist`
   - ตรวจสอบว่าเปิดใช้งาน **URL Rewrite Module** แล้ว

4. **ทดสอบการทำงาน**

   - เปิดเบราว์เซอร์แล้วเข้าไปที่ `http://localhost:8080/` (หรือพอร์ตที่กำหนด)
   - ตรวจสอบว่าหน้าเว็บโหลดได้ถูกต้อง

### หมายเหตุ

- หากพบปัญหา 404 เมื่อรีเฟรชหน้า ให้ตรวจสอบว่าไฟล์ `web.config` อยู่ใน `dist` และ IIS เปิดใช้งาน URL Rewrite
- หากพบปัญหา MIME Type ให้ตรวจสอบว่า IIS รองรับไฟล์ `.js`, `.css`, `.json` และไฟล์อื่น ๆ ที่จำเป็น



