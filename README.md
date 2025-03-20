# frontlend-T-W

### deployed npm run dev แล้วจะได้โพล์เดอร์ dist และให้เพิ่มไฟล์ web.config ภายในแล้ววางโค้ด

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
