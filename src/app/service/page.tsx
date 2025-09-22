export default function ServicePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">서비스 안내</h1>
      <div className="prose max-w-none">
        <p className="text-lg mb-4">
          아트넥스의 다양한 AI 기반 서비스를 소개합니다.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-3">AI 리포트</h2>
            <p>데이터 기반의 인사이트를 제공하는 AI 리포트 서비스입니다.</p>
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-3">AI 디자인</h2>
            <p>창의적이고 전문적인 디자인을 AI로 생성하는 서비스입니다.</p>
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-3">AI 마케팅</h2>
            <p>효과적인 마케팅 전략을 AI가 제안하는 서비스입니다.</p>
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-3">브랜드 컨설팅</h2>
            <p>브랜드 전략 수립부터 실행까지 전문적인 컨설팅을 제공합니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
}