export function validateMutationForm(values) {
  const issues = [];

  if (!values.applicantName || !values.applicantName.trim()) {
    issues.push({ field: 'applicantName', message: 'আবেদনকারীর নাম প্রদান করুন।', severity: 'error' });
  }

  if (!values.applicantPhone || !values.applicantPhone.trim() || values.applicantPhone.length < 11) {
    issues.push({ field: 'applicantPhone', message: 'সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 017xxxxxxxx)।', severity: 'error' });
  }

  if (!values.district || !values.district.trim()) {
    issues.push({ field: 'district', message: 'জেলা নির্বাচন করুন।', severity: 'error' });
  }

  if (!values.mouza || !values.mouza.trim()) {
    issues.push({ field: 'mouza', message: 'মৌজার নাম ও জেএল নম্বর পূরণ করুন।', severity: 'error' });
  }

  if (!values.dagNo || !values.dagNo.trim()) {
    issues.push({ field: 'dagNo', message: 'দাগ নম্বর প্রদান করা আবশ্যক।', severity: 'error' });
  }

  if (!values.areaDecimal || parseFloat(values.areaDecimal) <= 0) {
    issues.push({ field: 'areaDecimal', message: 'আবেদনকৃত জমির পরিমাণ (শতক) উল্লেখ করুন।', severity: 'error' });
  }

  // Document checklist rules
  if (!values.hasMainDeed && values.originType !== 'inheritance') {
    issues.push({ field: 'hasMainDeed', message: 'মূল দলিলের স্পষ্ট স্ক্যান কপি সংযুক্ত করা বাধ্যতামূলক।', severity: 'error' });
  }

  if (values.originType === 'inheritance' && !values.hasWarisanCertificate) {
    issues.push({ field: 'hasWarisanCertificate', message: 'উত্তরাধিকার সূত্রে প্রাপ্ত জমির ক্ষেত্রে ওয়ারিশান সনদ ছাড়া আবেদন গ্রহণযোগ্য হবে না।', severity: 'error' });
  }

  if (!values.hasTaxReceipt) {
    issues.push({ field: 'hasTaxReceipt', message: 'হাল সনের ভূমি উন্নয়ন কর (খাজনা) দাখিলা সংযুক্ত নেই। শুনানির পূর্বে বকেয়া খাজনা পরিশোধ করতে হবে।', severity: 'warning' });
  }

  if (!values.hasBayaDeed && values.originType === 'purchase') {
    issues.push({ field: 'hasBayaDeed', message: 'বিগত ২৫ বছরের বায়া দলিলের কপি দেওয়া হয়নি। মালিকানা ধারাবাহিকতা প্রমাণের জন্য বায়া দলিল প্রয়োজন।', severity: 'warning' });
  }

  if (!values.hasPorcha) {
    issues.push({ field: 'hasPorcha', message: 'সর্বশেষ আরএস বা বিএস পরচার কপি সংযুক্ত করা জরুরি।', severity: 'warning' });
  }

  return issues;
}
