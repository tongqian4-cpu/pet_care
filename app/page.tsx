"use client";

import { FormEvent, useEffect, useState } from "react";

const services = [
  {
    title: "基础洗护",
    text: "洁耳、剪甲、洗澡、吹干、梳毛，适合日常清洁和换季护理。",
    icon: "bath",
  },
  {
    title: "造型修剪",
    text: "泰迪、比熊、博美、猫咪局部修剪，兼顾美观、散热和活动舒适度。",
    icon: "scissors",
  },
  {
    title: "皮毛深护",
    text: "针对毛躁、打结、换毛期和敏感皮肤，使用温和护理方案。",
    icon: "care",
  },
  {
    title: "除味护理",
    text: "口周、脚底、耳部和毛发异味重点处理，适合雨季和运动量大的宠物。",
    icon: "fresh",
  },
];

const environmentSlides = [
  {
    src: "/assets/environment-reception.png",
    alt: "高端宠物洗护店前台接待和等候区域",
    title: "前台接待区",
    caption: "预约沟通、等候休息、护理产品展示",
  },
  {
    src: "/assets/environment-spa.png",
    alt: "高端宠物洗护店洗澡水疗区域",
    title: "洗护水疗区",
    caption: "分区洗浴、恒温冲洗、毛巾收纳",
  },
  {
    src: "/assets/environment-grooming.png",
    alt: "高端宠物洗护店美容修剪和吹毛区域",
    title: "美容吹毛区",
    caption: "造型修剪、低噪烘干、独立护理台",
  },
];

const storeAddress = "重庆市南岸区崇文路80号重庆邮电大学崇文门附近";
const baiduNavigationUrl = `https://api.map.baidu.com/direction?destination=${encodeURIComponent(storeAddress)}&mode=walking&region=${encodeURIComponent("重庆")}&output=html&src=${encodeURIComponent("pet_care")}`;

const packages = [
  {
    tag: "日常清洁",
    title: "基础洗护",
    price: "¥68",
    featured: false,
    items: ["洗澡、吹干、基础梳理", "洁耳、剪甲、足底毛清理", "洗后照片和护理建议"],
  },
  {
    tag: "推荐选择",
    title: "精致洗护",
    price: "¥128",
    featured: true,
    items: ["基础洗护全部项目", "局部修剪、毛结处理", "皮毛柔顺护理和除味护理"],
  },
  {
    tag: "造型护理",
    title: "美容造型",
    price: "¥198",
    featured: false,
    items: ["洗护、修剪、造型设计", "头脸、身体、尾部精修", "适合拍照、节日和换季"],
  },
];

const steps = [
  ["预约确认", "确认宠物体型、毛量、服务项目和可到店时间。"],
  ["洗前检查", "检查皮肤、耳道、指甲、毛结和情绪，说明可能增加的护理项。"],
  ["分区护理", "按宠物耐受度安排洗澡、吹干、修剪和皮毛护理。"],
  ["洗后反馈", "发送护理照片，说明皮肤、毛发、耳朵和指甲的后续观察点。"],
];

const reviews = [
  ["洗完很蓬松", "比熊之前很怕吹风，这次店员会分段安抚，洗完毛很顺，还拍了护理照片。"],
  ["猫咪也能适应", "猫咪第一次来，先让它熟悉环境，没有强行加快流程，回家状态挺稳定。"],
  ["沟通很清楚", "毛结严重会提前说价格和风险，剪完效果比预期自然，后续打理也讲得明白。"],
];

function ServiceIcon({ name }: { name: string }) {
  if (name === "scissors") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m4 20 7-7M14 7l3-3 3 3-3 3M5 5l14 14M14 14l5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "care") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 21s7-4.3 7-11a7 7 0 0 0-14 0c0 6.7 7 11 7 11ZM9.5 10.5h5M12 8v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "fresh") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 15c3-2 5-2 8 0s5 2 8 0M6 10c2-1.5 4-1.5 6 0s4 1.5 6 0M8 5c1.3-.8 2.7-.8 4 0s2.7.8 4 0M7 20h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 14c-2.2 0-4-1.8-4-4 0-1.8 1.2-3.4 3-3.9M17 14c2.2 0 4-1.8 4-4 0-1.8-1.2-3.4-3-3.9M8 18h8M9 5c.8-1.2 1.8-2 3-2s2.2.8 3 2M8 10h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function Home() {
  const [slide, setSlide] = useState(0);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlide((current) => (current + 1) % environmentSlides.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setToast(`已记录：${data.get("petType")} ${data.get("service")}，预约日期 ${data.get("date")}。`);
    event.currentTarget.reset();
  }

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setToast("咨询已记录，门店会尽快联系您。");
    event.currentTarget.reset();
  }

  function showSlide(index: number) {
    setSlide((index + environmentSlides.length) % environmentSlides.length);
  }

  return (
    <>
      <header className="site-header">
        <nav className="nav" aria-label="主导航">
          <a className="brand" href="#top" aria-label="泡泡爪宠物洗护首页">
            <span className="brand-mark" aria-hidden="true">爪</span>
            <span>泡泡爪宠物洗护</span>
          </a>
          <div className="nav-links">
            <a href="#services">服务</a>
            <a href="#environment">环境</a>
            <a href="#packages">套餐</a>
            <a href="#process">流程</a>
            <a href="#visit">到店</a>
          </div>
          <a className="nav-cta" href="#booking">预约</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-label="宠物洗护店首屏">
          <div className="hero-inner">
            <p className="eyebrow">犬猫洗澡、美容修剪、皮毛护理</p>
            <h1>泡泡爪宠物洗护</h1>
            <p className="hero-copy">透明可预约的社区宠物洗护店。按体型、毛量和护理需求匹配服务，洗前评估，洗后反馈，让宠物干净舒适，也让主人放心。</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#booking">立即预约</a>
              <a className="button button-secondary" href="#packages">查看套餐</a>
            </div>
          </div>
        </section>

        <section className="quick-book" id="booking" aria-label="快速预约">
          <form className="book-form" onSubmit={submitBooking}>
            <label>宠物类型<select name="petType" required defaultValue=""><option value="">请选择</option><option>小型犬</option><option>中大型犬</option><option>猫咪</option></select></label>
            <label>服务项目<select name="service" required defaultValue=""><option value="">请选择</option><option>基础洗护</option><option>造型修剪</option><option>皮毛深护</option><option>除味护理</option></select></label>
            <label>预约日期<input type="date" name="date" required /></label>
            <label>联系电话<input type="tel" name="phone" inputMode="tel" placeholder="请输入手机号" required /></label>
            <button className="button button-primary" type="submit">提交预约</button>
          </form>
        </section>

        <section className="section" id="services">
          <div className="wrap">
            <div className="section-head">
              <p className="section-kicker">护理服务</p>
              <h2>从基础清洁到精细造型，按宠物状态安排流程</h2>
              <p className="lead">每只宠物入店都会先看皮肤、毛结、指甲和情绪状态，避免用一套流程处理所有情况。</p>
            </div>
            <div className="service-grid">
              {services.map((service) => (
                <article className="service-card" key={service.title}>
                  <div className="service-icon"><ServiceIcon name={service.icon} /></div>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="environment">
          <div className="wrap environment-layout">
            <div>
              <div className="section-head">
                <p className="section-kicker">店内环境</p>
                <h2>中国高端宠物洗护店的分区空间</h2>
                <p className="lead">接待、洗护和美容区相互独立，减少宠物等待时的干扰，也让主人能清楚看到门店的卫生与流程。</p>
              </div>
              <ul className="environment-points">
                <li>前台接待区采用暖木、石材和玻璃隔断，便于预约沟通和短暂停留。</li>
                <li>洗护水疗区强调防滑、通风、分隔和器具收纳，降低洗澡过程的紧张感。</li>
                <li>美容吹毛区配置独立工作台和安静烘干设备，适合精修造型和长毛护理。</li>
              </ul>
            </div>

            <div className="environment-carousel" aria-label="店内环境轮播图">
              <div className="carousel-track" style={{ transform: `translateX(-${slide * 100}%)` }}>
                {environmentSlides.map((item) => (
                  <figure className="environment-slide" key={item.src}>
                    <img src={item.src} alt={item.alt} />
                    <figcaption>{item.title}<span>{item.caption}</span></figcaption>
                  </figure>
                ))}
              </div>
              <button className="carousel-control prev" type="button" aria-label="上一张环境图" onClick={() => showSlide(slide - 1)}>‹</button>
              <button className="carousel-control next" type="button" aria-label="下一张环境图" onClick={() => showSlide(slide + 1)}>›</button>
              <div className="carousel-dots" aria-label="环境图轮播分页">
                {environmentSlides.map((item, index) => (
                  <button className={`carousel-dot${slide === index ? " active" : ""}`} type="button" aria-label={`查看${item.title}`} onClick={() => showSlide(index)} key={item.title} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section alt" id="packages">
          <div className="wrap">
            <div className="section-head">
              <p className="section-kicker">透明套餐</p>
              <h2>价格按体型和护理难度确认，到店前先沟通</h2>
              <p className="lead">以下为常用套餐参考价，毛结严重、特殊体型或攻击性护理会在开工前单独确认。</p>
            </div>
            <div className="pricing">
              {packages.map((item) => (
                <article className={`price-card${item.featured ? " featured" : ""}`} key={item.title}>
                  <div className="tag">{item.tag}</div>
                  <h3>{item.title}</h3>
                  <div className="price">{item.price} <small>起</small></div>
                  <ul className="list">
                    {item.items.map((line) => <li key={line}><span className="check">✓</span><span>{line}</span></li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="process">
          <div className="wrap process">
            <div className="salon-shot" role="img" aria-label="明亮整洁的宠物洗护门店环境" />
            <div>
              <div className="section-head">
                <p className="section-kicker">到店流程</p>
                <h2>减少等待，让宠物在稳定节奏里完成护理</h2>
                <p className="lead">洗护过程保留关键反馈，主人可以清楚知道宠物本次护理状态。</p>
              </div>
              <div className="steps">
                {steps.map(([title, text]) => <article className="step" key={title}><div><h3>{title}</h3><p>{text}</p></div></article>)}
              </div>
            </div>
          </div>
        </section>

        <section className="section alt" aria-label="客户评价">
          <div className="wrap">
            <div className="section-head">
              <p className="section-kicker">真实体验</p>
              <h2>让宠物干净，也让主人少一点担心</h2>
            </div>
            <div className="review-grid">
              {reviews.map(([title, text]) => <article className="review-card" key={title}><div className="stars" aria-label="五星评价">★★★★★</div><h3>{title}</h3><p>{text}</p></article>)}
            </div>
          </div>
        </section>

        <section className="section" id="visit">
          <div className="wrap visit">
            <div className="info-panel">
              <p className="section-kicker">门店信息</p>
              <h2>欢迎提前预约到店</h2>
              <ul className="info-list">
                <li><strong>营业时间</strong>周一至周日 10:00 - 21:00</li>
                <li><strong>门店地址</strong>重庆市南岸区崇文路80号重庆邮电大学</li>
                <li><strong>到店位置</strong>重庆邮电大学崇文门附近，建议导航搜索“重庆邮电大学崇文门”后步行到店。</li>
                <li><strong>预约电话</strong>138-0000-8888</li>
                <li><strong>温馨提示</strong>首次到店建议携带疫苗记录；猫咪请使用航空箱或结实猫包。</li>
              </ul>
            </div>
            <div className="contact-panel">
              <p className="section-kicker">留言咨询</p>
              <h2>告诉我们宠物情况</h2>
              <form className="contact-form" onSubmit={submitContact}>
                <label>您的称呼<input type="text" name="name" placeholder="例如：王女士" required /></label>
                <label>宠物情况<textarea name="message" placeholder="例如：3 岁泰迪，最近毛结比较多，想预约精致洗护" required /></label>
                <button className="button button-primary" type="submit">发送咨询</button>
              </form>
            </div>
            <div className="map-panel">
              <div className="map-panel-head">
                <div>
                  <p className="section-kicker">到店地图</p>
                  <h2>重庆邮电大学崇文门附近</h2>
                </div>
                <a className="map-nav-button" href={baiduNavigationUrl} target="_blank" rel="noreferrer">导航到店</a>
              </div>
              <div className="map-content">
                <div className="map-main">
                  <div className="map-visual" role="img" aria-label="重庆市南岸区崇文路80号重庆邮电大学附近的宠物店风格位置示意图">
                    <img src="/assets/cute-location-map.png" alt="宠物店风格地图，标注重庆邮电大学崇文门附近店铺位置" />
                  </div>
                  <div className="map-address-card">
                    <strong>店铺位置</strong>
                    <p>重庆市南岸区崇文路80号重庆邮电大学</p>
                    <div className="map-badges" aria-label="位置提示">
                      <span className="map-badge">崇文门附近</span>
                      <span className="map-badge">崇文路沿线</span>
                      <span className="map-badge">可导航到店</span>
                    </div>
                  </div>
                </div>
                <aside className="map-guide" aria-label="到店路线说明">
                  <div className="map-guide-card primary">
                    <span>导航关键词</span>
                    <strong>重庆邮电大学崇文门</strong>
                    <p>店铺位于崇文门附近，到达校门后沿崇文路沿线步行查找。</p>
                  </div>
                  <div className="map-guide-card">
                    <span>路线参照</span>
                    <strong>崇文路沿线社区商业</strong>
                    <p>地图左侧为文峰阁小区、南福苑小区方向，右侧为重邮校区。</p>
                  </div>
                  <div className="map-guide-card">
                    <span>到店建议</span>
                    <strong>宠物请牵引或装入航空箱</strong>
                    <p>猫咪建议使用结实猫包；中大型犬建议提前电话确认接待时段。</p>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap">
          <span>© 2026 泡泡爪宠物洗护</span>
          <span>干净、耐心、透明沟通的社区宠物护理服务</span>
        </div>
      </footer>

      <div className={`toast${toast ? " show" : ""}`} role="status" aria-live="polite">{toast}</div>
    </>
  );
}
