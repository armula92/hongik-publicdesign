/* header style on scroll + to-top */
const header=document.querySelector('header.site'),toTop=document.querySelector('.to-top');
const onScroll=()=>{const y=window.scrollY;header.classList.toggle('solid',y>window.innerHeight*0.6);toTop.classList.toggle('show',y>900)};
window.addEventListener('scroll',onScroll,{passive:true});onScroll();

/* language flags: 페이지 안 Google 번역(웹사이트 번역 도구). translate.goog 주소 방식은 한국 등에서 차단되어 사용하지 않음 */
const langNav=document.querySelector('.nav .lang'),langM=langNav.cloneNode(true);
langM.classList.add('m');document.getElementById('mobileMenu').prepend(langM);
const gtCookie=()=>{const m=document.cookie.match(/(?:^|;\s*)googtrans=\/ko\/([^;]+)/);return m?decodeURIComponent(m[1]):'ko'};
const setGt=l=>{const host=location.hostname,base=host.replace(/^www\./,'');
  const exp=l==='ko'?';expires=Thu, 01 Jan 1970 00:00:00 GMT':'';const v=l==='ko'?'':'/ko/'+l;
  ['', ';domain='+host, ';domain=.'+base].forEach(d=>{document.cookie='googtrans='+v+';path=/'+d+exp});};
let curLang=gtCookie();
const qLang=new URLSearchParams(location.search).get('lang');
if(qLang&&qLang!==curLang){setGt(qLang);curLang=qLang;}
document.querySelectorAll('.lang a').forEach(a=>{
  const l=a.dataset.lang;if(l===curLang)a.setAttribute('aria-current','true');
  a.addEventListener('click',e=>{e.preventDefault();if(l===gtCookie())return;setGt(l);
    const u=new URL(location.href);u.searchParams.delete('lang');history.replaceState(null,'',u.pathname+u.search+u.hash);location.reload();});
});
if(curLang!=='ko'){
  window.gtInit=()=>{new google.translate.TranslateElement({pageLanguage:'ko',includedLanguages:'en,zh-CN,ja',autoDisplay:false},'gt-el')};
  const sc=document.createElement('script');sc.src='https://translate.google.com/translate_a/element.js?cb=gtInit';document.body.appendChild(sc);
}

/* mobile menu */
const burger=document.querySelector('.burger'),mm=document.getElementById('mobileMenu');
burger.addEventListener('click',()=>{const o=mm.classList.toggle('open');document.body.classList.toggle('menu-open',o);burger.setAttribute('aria-expanded',o);header.classList.toggle('solid',o||window.scrollY>window.innerHeight*0.6)});
mm.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mm.classList.remove('open');document.body.classList.remove('menu-open');burger.setAttribute('aria-expanded',false);onScroll()}));

/* reveal on scroll */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));

/* count up */
const cio=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target,to=+el.dataset.count,t0=performance.now(),d=1400;
  const step=t=>{const p=Math.min((t-t0)/d,1);el.textContent=Math.round(to*(1-Math.pow(1-p,3)))+(p===1&&to===100?'+':'');if(p<1)requestAnimationFrame(step)};requestAnimationFrame(step);cio.unobserve(el)}),{threshold:.5});
document.querySelectorAll('[data-count]').forEach(el=>cio.observe(el));

/* curriculum tabs */
document.querySelectorAll('.tab').forEach(t=>t.addEventListener('click',()=>{
  document.querySelectorAll('.tab').forEach(x=>x.setAttribute('aria-selected',x===t));
  document.querySelectorAll('.panel').forEach(p=>p.hidden=p.id!==t.getAttribute('aria-controls'));
}));
/* course cards */
document.querySelectorAll('.course').forEach(c=>c.addEventListener('click',()=>{const o=c.classList.toggle('open');c.querySelector('.more').textContent=o?'접기 −':'자세히 +'}));

/* timeline */
const TL={
"2018": [
"1학기|공공디자인전공 신설",
"1학기|석사 12명 입학",
"1학기|제1회 공공디자인 세미나 (홍익대학교)",
"1학기|연구결과집 Public Design Promenade Vol.1.0",
"2학기|제2회 공공디자인 세미나 (하나금융 클럽원)",
"2학기|석사 5명 입학",
"2학기|제1회 공공디자인 학술답사 (대구 근대골목)",
"2학기|수원시 도시디자인 아카데미 교육 진행",
"2학기|[전공 특강] 안전한 도시를 위한 CPTED 안전디자인 전략",
"2학기|연구결과집 Public Design Promenade Vol.2.0",
"2학기|공공디자인 전공 종강 학술세미나"
],
"2019": [
"1학기|제2회 공공디자인 학술답사 (중국 상하이)",
"1학기|제3회 공공디자인 세미나 (하나금융 클럽원)",
"1학기|석사 12명 입학",
"1학기|[전공 특강] 공공디자인진흥법의 한계와 서울시 공공디자인 조례전략",
"1학기|홍익대학교 공공디자인연구센터 개소",
"1학기|용인시 공공디자인 아카데미 교육 진행",
"1학기|공공디자인진흥포럼 개최 (홍익대학교)",
"1학기|카카오 임팩트 100up 참여",
"1학기|서울시 스타트업 공공디자인 기업 참여",
"1학기|공공디자인 전공 종강 학술세미나",
"1학기|제4회 홍익대학교 공공디자인 콜로키움 “사회문제, 사회가치 그리고 공공디자인”",
"1학기|2019 공공디자인 시민공모전 수상 (김세련, 김현수)",
"2학기|2019 대한민국 공공디자인대상 학술부문 특별상 ‘빅터 마골린상’ 수상 (지도교수 이현성)",
"2학기|한국공간디자인학회 추계 학술대회 우수논문상 (오유경, 박재용)",
"2학기|카카오 임팩트 100up 학생홍보 및 참여 지도 (석사과정 참여)",
"2학기|서울시 스타트업 공공디자인 기업 참여 지도 (석사과정 참여)",
"2학기|생활SOC 지역사회공헌 통합 세미나 (홍익대+중앙대 공동운영 및 학생 교류)",
"2학기|학술답사 (세종시 · 조치원 도시재생 · 대전시 안전마을)",
"2학기|한국도로공사 공공디자인 공모전 수상 (석사과정 참가 지도)"
],
"2020": [
"03.03|서울 강남구–홍익대 공공디자인연구센터 업무협약(MOU) 기획 협의",
"1학기|공공디자인 웨비나 01 “Universal & Governance in Public Design” 기획 및 주관",
"1학기|관·학 협력 연구 ‘강남구 틈새공간 공공디자인’ (산업디자인 학부·공간디자인 석사 4개팀 지도)",
"1학기|한국도로공사 고객디자인단 참여 (석사과정 참가 지도)",
"08.10|공공디자인 뉴스레터 Public Design 365 창간",
"2학기|국내 최초 ‘공공디자인’ 박사과정 신설 기획안 및 교과목 기획 연구",
"2학기|한국도로공사 공공디자인 공모전 수상",
"2학기|수원 국제 공공디자인 포럼 총괄 기획 및 운영 (수원시–연구센터 공동)",
"2학기|공공디자인 전문가 직무 교과서 기획 및 연구 발행 (한국공예·디자인문화진흥원)",
"2학기|공공디자인 전문 온라인 소식지 기획 및 운영 (한국공예·디자인문화진흥원)",
"11.04|한국공예·디자인문화진흥원 업무협약(MOU) 체결",
"2학기|수원시정연구원 업무협약(MOU)",
"2학기|강남구 공공디자인진흥계획 아카데미 교육 기획 및 운영",
"2학기|2020 문화체육관광부 장관상 수상 (연구센터 소장)"
],
"2021": [
"02|서울시 소유자산 유니버설디자인 시각화 현장조사 (한국공공디자인학회)",
"02|구미시 공단동 도시재생 활성화계획 수립용역 (한국도시설계학회)",
"03|송파구 공공디자인진흥계획 수주",
"04|Walkable 향교로 특화 가로 환경연구 (수원시정연구원)",
"05|알파리움타워 2동 어린이집 인테리어 설계 (NC Soft)",
"05|한국도로공사 국민디자인 참여 (김유진)",
"06|문화체육관광부 공공디자인 기획전시 ‘익숙한 미래’ (총괄기획감독 이현성)",
"07|PDG12 유네스코 지속가능발전교육(ESD) 인증",
"07|한국국토정보공사 LX 공모전 우수상 (심윤서)",
"07|2021 청년디자이너 인턴십지원 컨설팅 운영 및 지원 (한국공예·디자인문화진흥원)",
"08|인천광역시 도시디자인진흥계획 수립용역",
"08.28|국제공공디자인포럼(IPDF) 발대식",
"08|공공디자인 콜로키움 개최",
"08|공공소통연구소 업무협약(MOU) 체결",
"08|한국사회복지협의회 사회공헌센터 업무협약(MOU) 체결",
"09|아산프론티어 아카데미 협업 (서초구 흡연개선방안 마련 프로젝트)",
"09|고양시 공직자 공공디자인 인식 함양 교육",
"10|한국매니페스토실천본부 업무협약(MOU) 체결",
"10|문화체육관광부 공공디자인 중등교과서 집필연구",
"11|용인시 유니버설·공공디자인 아카데미 운영",
"12.11|공공디자인 논문발표 및 종강세미나",
"12.18|제1회 IPDF 국제공공디자인포럼"
],
"2022": [
"03.26|제7회 공공디자인 전공 개강 콜로키움",
"04.05|D-TECH 기술 디자인공모전 우수상 (임성욱, 조지영 · 석사과정)",
"04.21|공공디자인 거버넌스 특강 (박지호 체인지워크 대표)",
"05.16|일본 TDA 경관 디자인 지원기구 × 연구센터 ‘한일 경관 교육 대담회’",
"06.21|프랑스 디자인 그룹 Cabanon Vertical 국제교류 MOU 체결",
"06.21|2022-1학기 통합종강 세미나",
"07|한국도로공사 5기 국민 고객디자인단 운영",
"07.05|공공디자인전공 석사 논문인준식",
"09|공공디자인 전공 개강 콜로키움 (정동1928아트센터)",
"09.16|국제 Park(ing) Day 참가",
"2022|‘강남 ESG 공공디자인 아이디어 공모전’ 3팀 수상 — 우수상 김종혁(석사9기)·김나현(석사8기), 장려상 이보아(박사3기)·김세련(석사1기 졸업)",
"2022|제16회 경기도 공공디자인 공모전 금상 (임성욱 · 석사7기)",
"2022|경관디자인+공공디자인 집담회 ‘공공이 경관에게 경관이 공공에게’ 공동 주관",
"2022|2022 공공디자인 페스티벌 [IPDF 코리아 에디션] ‘2022 공공디자인 워크숍’ 운영",
"12.10|제2회 IPDF 국제공공디자인포럼 (중국, 온라인) 공동 주최",
"2022|대한민국 공공디자인대상 학술부문 특별상 ‘빅터 마골린상’ (심윤서)"
],
"2023": [
"02.28|석·박사 신입생 오리엔테이션",
"05.03|K-디자인 비전 선포식 초대 참가",
"05.13|The Public Design Forum 2023 ‘공공가치를 추구하는 사람들의 공공디자인 사용하기’ 주최",
"05.17|Public NPO Testbed 공심이 × 서울환경연합 택티컬 어바니즘 ‘가치그려’",
"06|중국 디자인 대학 5개교 공공디자인 연합학술교류회",
"06|국제공공디자인포럼 IPDF 주최",
"06.16|노신미술대학 도시재생&문화진흥 국제연구센터 학술 협력 양해각서 체결",
"06.18|공공디자인전공 종강세미나",
"06|김주연 교수 인천광역시 총괄디자이너 선정",
"07.21|광운대 공공소통연구소 LOUD 학술교류 ‘공공디자인포럼 X: 사회갈등예방을 위한 디자인 Vol.1’",
"08.23|문화체육관광부 공공디자인 청년 인턴십 직무교육 주관",
"08.26|공공디자인 전공 개강세미나 (에피소드 신촌 369)",
"08|장영호 교수 남원시 공공디자인 총괄디자이너 위촉",
"09.19|공공디자인포럼 ‘프랑스 공공디자인 거버넌스’ 주최 (프랑스 문화원·주한 프랑스 대사관 후원)",
"09|인사혁신처 ‘적극행정 상징물(캐릭터) 공모전’ 우수상 (이우주 · 석사과정)",
"10|공공디자인 페스티벌 ‘사회갈등예방 디자인’ 특별 세미나 (연구센터·광운대 공공소통연구소·한국PR학회 공동 주관)",
"10.23|청년 디자이너를 위한 공공디자인 워크숍 주관 (문화역서울284 RTO)",
"10.25|미국미술치료학회(AATA) 학술발표 (주하나 · 박사과정)",
"10|2023 대한민국 공공디자인대상 연구부문 최우수상(문체부 장관상)·특별상(빅터 마골린상) (김상아, 이주호 · 박사과정)",
"10|제25회 대한민국디자인대상 디자인 공로 부문 대통령 표창 (김주연 교수)"
],
"2024": [
"01|국제공공디자인포럼 IPDF 사전행사 도쿄 개최 (일본 GK디자인 그룹, 중국 노신미술대학교, 시안건축과학기술대학교)",
"01|제2차 강원 공공디자인진흥전략 ‘공공디자인 시대’ 기조 발제 (김주연 소장)",
"02|2024-1학기 개강세미나 “공공디자인과 일상의 연결!”",
"02|연구센터 특별 세미나 ‘사회실험 디자인 프로젝트에 대한 재고’",
"05|『공공디자인으로 안전만들기』 (미세움) 출간",
"05|공공디자인포럼 PDF 에이스케 다치카와(Eisuke Tachikawa) 초빙",
"05|영주시 교량 경관디자인 기획 연구",
"06|한국건설기술연구원 K-지하고속도로 공공디자인 업무협약",
"06|서안건축과학대학교 문화·교육·연구 협력 양해각서 체결",
"06|국제 공공디자인 포럼 IPDF 2024 ‘도시를 위한 공공디자인 Public Design for the City’ (시안과학기술대학교)",
"06|초장대 K-지하 고속도로 인프라 안전 및 효율 향상 기술 개발 R&D 연구 (1차)",
"07|공공디자인 뉴스레터 ‘The Public Design 365’ 100호 발간",
"07|‘Public Design Governance’ 모델 UNESCO 지속가능교육(ESD) 재인증",
"07|서울시 사회문제해결디자인 기본계획 수립",
"07|사회갈등 해결 ‘분리형 흡연 부스’ 매뉴얼 개발",
"07|미국 미술치료자격 전문감독관 ATCS 자격 취득 (주하나 · 박사과정)",
"07|서울역 광고매체 리뉴얼 마스터플랜 수립 (코레일)",
"08|충남 공공디자인 아카데미 기획 운영",
"08|NPO Testbed 공.심.이 예비창업패키지 체결 / 도리도리 프로젝트",
"10|김주연 교수 제1대 서울시 총괄 공공디자이너 위촉",
"10|2024 대한민국 공공디자인대상 연구부문 우수상 (한국공예·디자인문화진흥원 원장상, 김세훈 · 박사과정)",
"10|문화체육관광부 공공디자인 시범사업 ‘멘탈케어디자인’ 실증연구 (주하나 · 박사과정)",
"10|대구 현풍천 교량 경관 개선사업 디자인 개발 및 기본구상 용역",
"10|현대백화점 면세점 ESG 공공디자인 H-gram Design 기획 수립",
"11|2024 대한민국 공공디자인 페스티벌: 공공디자인 실험실 5개소 기획 운영",
"11|2024 페스티벌: The Public Design Forum X ‘사회갈등 예방을 위한 디자인 Vol.2’",
"11|2024 페스티벌: Public Design Day 기획 운영",
"11|2024 페스티벌: 『공공디자인으로 안전만들기』 북 세미나",
"11|2024 페스티벌: 공공디자인 청년 네트워크 Network Design Party – Dopamine",
"11|‘더 큰 파주’ 도시디자인 아카데미 기획 운영",
"11|공공기관 사회공헌 세미나 ‘ESG 공공디자인’ (이현성 부소장, 사회공헌센터)",
"12|파주시 ‘모두의 순찰대’ 행정안전부 공공서비스디자인 우수과제·행정안전부장관상 (김상아 · 박사과정)",
"12|대구 달성 논공 다다촌 특화거리 조성사업 기본 및 실시설계 용역",
"12|대전 도시디자인 리빙랩 기획 운영 (대전디자인진흥원)"
],
"2025": [
"01|2024년도 유네스코 지속가능발전교육 공식프로젝트 재인증",
"01|(사)공간디자인학회 중국 닝보대학 국제 컨퍼런스 발제 ‘Private-Public Collaborative Design’",
"03|2025-1학기 개강세미나 ‘협력으로 만드는 포용사회’",
"04|공공디자인포럼 PDF X ‘사회적 녹색 처방 Social Green Prescribing: 공공디자인과 건강복지의 접점’",
"04|수원시 지역사회 심리·정서적 건강 지원 업무협약(MOU)",
"05|Jane’s Walk Seoul 2025 기획 운영",
"05|홍익대–수원시립미술관 2025 웰니스 프로그램 「마인딩」 기획 운영",
"06|2025 세계열린정부주간 민관합동 국제행사 참가",
"07|2025 오사카 엑스포 학술답사",
"09|2025-2학기 개강세미나 ‘Public Private Design’",
"09|KTX 서울역 공공매체 마스터플랜 수립",
"09|서울디자인국제포럼 SDIF 총괄기획감독 (이현성 교수)",
"09|2025 공공디자인 혁신 지원 사업 기본계획 수립",
"09|2025 공공디자인 혁신사례조사 연구 완료",
"09|공공서비스디자인 ‘고속철도 SRT 서비스를 re-design 하다’ 프로젝트 참여",
"09|경기관광공사 2025 경기형 웰니스 관광지 컨설팅 연구용역 계획 수립",
"10|2025 국제공공디자인포럼 IPDF 공동주관",
"10|칭화대·허베이미대·노신미대·홍익대 ‘한중 공공디자인 워크숍’",
"10|2025 페스티벌: 공공디자인 실험실 ‘공공스티커(The Public Sticker)’ SRT·사회공헌센터 협업",
"10|2025 페스티벌: 통합학술대회 참가 (이은영, 이지영)",
"10|공공디자인전공, 국제공공디자인포럼 IPDF 2025 주관",
"10|공공디자인포럼 PDF X ‘Design for Social-Changing in Taiwan & Korea’",
"10|국립대만디자인연구소(TDRI) 업무협약(MOU) 체결",
"10|KIDP 산업안전디자인 표준 개발을 위한 기초 연구",
"10|KTX 부산역·용산역 광고매체 리뉴얼 마스터플랜 수립 용역",
"10|2025 더 큰 파주 도시디자인 역량 강화 교육",
"10|제56회 AATA 미국미술치료학회 학술대회 연구발표 (포틀랜드, 주하나 · 박사과정)",
"11|경기형 웰니스 관광지 수원시립미술관 「왕의 산책」 프로그램 운영 및 실증평가",
"11|Alice’s Secret Passage (공심이 × CESCO × CHICOR × 강남구청)",
"11|공공디자인 세미나 PDF X ‘안전을 위한 오사카 공공디자인’ (Kutsuna Hiroki)",
"11|제27회 대한민국디자인대상 디자인 공로 부문 산업통상부장관 표창 (이현성 교수)",
"11|공공디자인 전문인력 교과서 리뉴얼 (문화체육관광부)",
"11|KIDP 산업안전디자인 세미나 2025 발제",
"11|2025-2 수원·화성시 일대 ‘공공디자인 국내 학술답사’",
"11|(사)한국공간디자인단체총연합회 제11대 회장 취임 (김주연 교수)"
],
"2026": [
"2026|굿디자인코리아 도쿄 설명회 발제 ‘PbD_Public by DESIGN’",
"2026|칭화대 ‘Design·AI 기반 혁신 및 π형 인재 양성 교수 교류 컨퍼런스’ 발제 “Agile Public Design for Social Innovation”",
"2026|공공디자인 실험실 ‘그린 세이프 브릿지’ (3M, SEDG, 이오디디자인)",
"2026|개강세미나 PUBLIC DESIGN SIX PERSPECTIVES “다음의 공공성: 여섯 개의 시선으로 바라본 공공디자인”",
"2026|HD현대 글로벌 R&D센터 안전디자인 Safephilic 연구",
"2026|사회혁신 디자인 네트워크 ‘DESIS Network’ 승인 및 ‘DESIS Lab’ 지정",
"2026|공공디자인 포럼 2026 「디자인, 도시를 재생하다 – 밀라노 디자인 위크의 국제화와 공공공간의 건축적 연계성」 (최지혜, Magma Project 대표)",
"2026|강원랜드 UX·XI 개선 기초방향 연구",
"2026|한·일 5개 대학 WDC 연계 ‘국제 공동 지역재생 워크숍’ (홍익대·치바대·동서대·동아대·동명대)",
"2026|‘더 큰 파주’ 도시디자인 아카데미 기획 운영",
"2026|2026 대한민국 공공디자인대상 학술부문 최우수상·우수상 (박재은 박사, 주하나 박사)",
"2026|2026 대한민국 공공디자인대상 진흥원장상 (Platform 111)",
"2026|오성훈 교수 부임"
]
};
const SUB={"2018":"전공 신설","2019":"연구센터 개소","2020":"박사과정 기획","2021":"UNESCO ESD 인증","2022":"국제 교류 확장","2023":"공공디자인포럼 X","2024":"안전·정책 연구","2025":"실험과 협력","2026":"DESIS Lab"};
const yrs=document.querySelector('.tl-years');
if(yrs){
const tlY=document.getElementById('tlYear'),tlL=document.getElementById('tlList');
function showYear(y){tlY.innerHTML=y+'<small>'+SUB[y]+'<br><span style="color:var(--mute);font-weight:600">'+TL[y].length+'개 항목</span></small>';tlL.innerHTML=TL[y].map(s=>{const i=s.indexOf('|');return '<li><span class="tl-d">'+s.slice(0,i)+'</span>'+s.slice(i+1)+'</li>'}).join('');
  yrs.querySelectorAll('button').forEach(b=>b.setAttribute('aria-selected',b.textContent===y))}
Object.keys(TL).forEach(y=>{const b=document.createElement('button');b.className='tl-year';b.textContent=y;b.setAttribute('role','tab');b.onclick=()=>showYear(y);yrs.appendChild(b)});
showYear("2026");
}


/* research center intro popup (iframe: rc-intro.html) */
(()=>{
  const m=document.getElementById('rcModal'),f=document.getElementById('rcFrame'); if(!m) return;
  document.querySelectorAll('[data-open-rc]').forEach(b=>b.addEventListener('click',()=>{
    if(!f.getAttribute('src')) f.src=f.dataset.src;
    m.showModal(); document.body.classList.add('modal-open'); setTimeout(()=>{try{f.contentWindow.focus()}catch(e){}},300);
  }));
  m.querySelector('.ad-close').onclick=()=>m.close();
  m.addEventListener('click',e=>{if(e.target===m)m.close()});
  m.addEventListener('close',()=>document.body.classList.remove('modal-open'));
  addEventListener('message',e=>{if(e.data==='close-rc')m.close()});
})();


/* applicant intro popup */
(()=>{
  const m=document.getElementById('adModal'),f=document.getElementById('adFrame'); if(!m) return;
  document.querySelectorAll('[data-open-ad]').forEach(b=>b.addEventListener('click',()=>{
    const mm=document.getElementById('mobileMenu'); if(mm&&mm.classList.contains('open')) document.querySelector('.burger').click();
    if(!f.getAttribute('src')) f.src=f.dataset.src; else if(f.contentWindow) f.contentWindow.postMessage('reset-admission','*');
    m.showModal(); document.body.classList.add('modal-open'); setTimeout(()=>{try{f.contentWindow.focus()}catch(e){}},300);
  }));
  m.querySelector('.ad-close').onclick=()=>m.close();
  m.addEventListener('click',e=>{if(e.target===m)m.close()});
  m.addEventListener('close',()=>document.body.classList.remove('modal-open'));
  addEventListener('message',e=>{if(e.data==='close-admission')m.close()});
})();


/* 홍익 공공디자인 의제 팝업: 본문은 agenda/<회차>.json 에서 불러옴 */
(()=>{
  const m=document.getElementById('agModal'); if(!m) return;
  const D=JSON.parse(document.getElementById('agData').textContent);
  const g=id=>document.getElementById(id), box=g('agContent');
  const esc=t=>t.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const render=b=>b.map(x=>x[0]==='h'?'<h4>'+esc(x[1])+'</h4>':x[0]==='p'?'<p>'+esc(x[1])+'</p>':
    x[0]==='i'?'<figure><img src="'+x[1]+'" width="'+x[2]+'" height="'+x[3]+'" loading="lazy" alt=""></figure>':'<figcaption>'+esc(x[1])+'</figcaption>').join('');
  document.querySelectorAll('[data-ag]').forEach(b=>b.addEventListener('click',()=>{
    const r=D[+b.dataset.ag];
    g('agTag').textContent=r.tag; g('agTitle').textContent=r.t; g('agDate').textContent=r.d.replace(/-/g,'. ')+'.';
    box.innerHTML='<p class="ag-loading">불러오는 중…</p>';
    m.showModal(); document.body.classList.add('modal-open'); m.scrollTop=0;
    fetch('agenda/'+r.k+'.json').then(x=>x.json()).then(b=>{box.innerHTML=render(b)}).catch(()=>{box.innerHTML='<p class="ag-loading">내용을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.</p>'});
  }));
  m.querySelector('.ag-close').onclick=()=>m.close();
  m.addEventListener('click',e=>{if(e.target===m)m.close()});
  m.addEventListener('close',()=>document.body.classList.remove('modal-open'));
})();

/* seminar series modal */
const sModal=document.getElementById('seriesModal');
if(sModal){
document.querySelectorAll('[data-open="seriesModal"]').forEach(b=>b.addEventListener('click',()=>{sModal.showModal();document.body.classList.add('modal-open')}));
sModal.querySelector('.sm-close').addEventListener('click',()=>sModal.close());
sModal.addEventListener('click',e=>{if(e.target===sModal)sModal.close()});
sModal.addEventListener('close',()=>document.body.classList.remove('modal-open'));
}

/* 현재 페이지 메뉴 표시 */
(()=>{const f=(location.pathname.split('/').pop()||'index.html');
  document.querySelectorAll('.menu>li>a').forEach(a=>{if(a.getAttribute('href')===f)a.setAttribute('aria-current','page')});
  document.querySelectorAll('.mobile-menu details').forEach(d=>{if([...d.querySelectorAll('a')].some(a=>a.getAttribute('href').split('#')[0]===f)){d.classList.add('cur');d.open=true}});
})();
/* 예전 한 페이지 주소(#about 등)로 들어오면 해당 페이지로 이동 */
(()=>{const MAP={"about": "about.html", "faculty": "about.html", "location": "about.html", "curriculum": "curriculum.html", "t-ma": "curriculum.html", "t-phd": "curriculum.html", "p-ma": "curriculum.html", "courses": "curriculum.html", "p-phd": "curriculum.html", "seminars": "curriculum.html", "series": "curriculum.html", "seriesModal": "curriculum.html", "seriesTitle": "curriculum.html", "agenda": "curriculum.html", "projects": "research.html", "research": "research.html", "pubs": "research.html", "people": "people.html", "alumni": "people.html", "history": "people.html", "tlYear": "people.html", "tlList": "people.html", "news": "news.html", "admission": "admission.html", "notice2027": "admission.html", "apply": "admission.html", "faq": "admission.html"};
  const h=decodeURIComponent(location.hash.slice(1)),f=(location.pathname.split('/').pop()||'index.html');
  if(h&&MAP[h]&&MAP[h]!==f&&!document.getElementById(h))location.replace(MAP[h]+'#'+h);
})();
