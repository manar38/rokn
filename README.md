# موقع قيمة | محاسبة واستشارات مالية عن بُعد (الموقع متعدد الصفحات الكامل)

مشروع متكامل متعدد الصفحات (Multi-page Website) لمنصة **قيمة**، تم فصل الهيكل (HTML) والتصميم (CSS) ومنطق العرض (JavaScript) وفق معمارية **MVVM** النظيفة مع الحفاظ بنسبة 100% على نفس الستايل، الرسوم المتحركة، والتجاوبية، والجاهزية للرفع المباشر على **Vercel**.

---

## 📁 هيكلية المشروع والصفحات (Project Structure)

```text
rokn/
├── index.html            # الصفحة الرئيسية (Landing Page كاملة مع جميع الأقسام)
├── services.html         # صفحة الخدمات المحاسبية والمالية المفصلة
├── packages.html         # صفحة الباقات والأسعار والمقارنات
├── process.html          # صفحة كيف نعمل والربط مع الأنظمة المحاسبية
├── trust.html            # مركز الثقة والأمان وحماية البيانات وسرية المعلومات
├── about.html            # صفحة عن قيمة ورسالتنا وفريق العمل
├── careers.html          # صفحة التوظيف ونموذج التقديم للانضمام للفريق
├── contact.html          # صفحة تواصل معنا وطلب العروض والاستشارات
├── check.html            # أداة فحص الدفاتر السريع والتقييم الذاتي المجاني
├── erp.html              # صفحة نظام قيمة ERP والربط مع زاتكا
├── login.html            # بوابة تسجيل دخول العملاء
├── bin/                  # ملفات وأوامر التشغيل والرفع والبناء (Binary CLI Scripts)
│   ├── serve.js          # خادم محلي خفيف لمعاينة الموقع (Preview Server)
│   ├── build.js          # فحص بنية الملفات وتجهيزها للرفع (Build & Check)
│   ├── deploy.sh         # سكريبت النشر المباشر على Vercel (Bash)
│   └── deploy.ps1        # سكريبت النشر المباشر على Vercel (PowerShell)
├── css/
│   ├── variables.css     # المتغيرات وألوان وهوية التصميم (Design Tokens)
│   ├── animations.css    # جميع حركات وتأثيرات CSS Keyframes & Transitions
│   └── style.css         # ملف التنسيق المجمع الرئيسي وتجاوبية الشاشات
├── js/
│   ├── viewmodel.js      # معمارية MVVM (Model-ViewModel-ViewBinder للعدادات والتفاعل)
│   └── main.js           # نقطة الدخول وتهيئة التطبيق (App Bootstrap)
├── vercel.json           # إعدادات الرفع والتوجيه والحماية لمنصة Vercel
├── package.json          # إعدادات الحزمة وأوامر التشغيل السريع
└── README.md             # دليل المشروع والتوثيق
```

---

## 🏗️ معمارية MVVM (Model-View-ViewModel)

تم بناء التطبيق بدون أي مكتبات ثقيلة مع الحفاظ على الأداء الفائق:
1. **Model (`StatsModel`)**: إدارة البيانات والقيم المستهدفة للعدادات.
2. **ViewModel (`StatsViewModel`)**: حساب الحركة بانسيابية مكعبة (`Cubic Ease-Out: e = 1 - (1 - p)³`).
3. **ViewBinder (`ViewBinder`)**: ربط البيانات والنماذج والنوافذ المنبثقة والتمرير الناعم.

---

## 🚀 الرفع على Vercel (Deployment Guide)

المشروع مهيأ تماماً مع [vercel.json](file:///c:/Users/MSI/Downloads/rokn/vercel.json) ليعمل بروابط نظيفة (Clean URLs) بدون الحاجة لكتابة `.html` في الرابط.

```bash
# فحص البناء والملفات
npm run build

# تشغيل المعاينة محلياً
npm run dev

# الرفع والإنتاج على Vercel
npm run deploy
```
