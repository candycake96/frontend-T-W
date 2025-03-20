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
   <configuration>
    <system.webServer>
        <rewrite>
            <rules>
                <!-- Reverse Proxy to Backend -->
                <rule name="ReverseProxyInboundRule" stopProcessing="true">
                    <match url="^api/(.*)" />
                    <action type="Rewrite" url="http://192.168.16.111:3333/api/{R:1}" logRewrittenUrl="true" />
                </rule>

                <!-- React SPA Rule -->
                <rule name="React SPA" stopProcessing="true">
                    <match url=".*" />
                    <conditions logicalGrouping="MatchAll">
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

### bootstrap
``` xml
   <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"/>

    <!-- Popper.js for Bootstrap -->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>

    <!-- Bootstrap JS (bundle includes Popper.js) -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
```


