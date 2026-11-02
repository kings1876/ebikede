import React, { useState, useMemo } from 'react';
import { Star, CheckCircle, ThumbsUp, MessageSquarePlus, X, Filter } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { calculateReviewStats, STORE_TRUSTPILOT_INFO } from '../data/reviews';

interface TrustpilotWidgetProps {
  productId: string;
  productName: string;
}

export const TrustpilotWidget: React.FC<TrustpilotWidgetProps> = ({ productId, productName }) => {
  const { language, getProductReviews, addReview } = useShop();
  const [selectedStarFilter, setSelectedStarFilter] = useState<number | null>(null);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [helpfulClicked, setHelpfulClicked] = useState<Record<string, boolean>>({});

  // Form states
  const [formRating, setFormRating] = useState(5);
  const [formAuthor, setFormAuthor] = useState('');
  const [formCity, setFormCity] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formComment, setFormComment] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const productReviews = getProductReviews(productId);
  const stats = useMemo(() => calculateReviewStats(productReviews), [productReviews]);

  const filteredReviews = useMemo(() => {
    if (selectedStarFilter === null) return productReviews;
    return productReviews.filter((r) => r.rating === selectedStarFilter);
  }, [productReviews, selectedStarFilter]);

  const handleHelpful = (id: string) => {
    setHelpfulClicked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formAuthor || !formTitle || !formComment) return;

    addReview({
      productId,
      author: formAuthor,
      city: formCity || (language === 'de' ? 'Deutschland' : 'Germany'),
      country: language === 'de' ? 'DE' : 'EU',
      rating: formRating,
      titleDe: formTitle,
      titleEn: formTitle,
      commentDe: formComment,
      commentEn: formComment,
      verifiedBuyer: true,
    });

    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setIsWriteModalOpen(false);
      setFormAuthor('');
      setFormCity('');
      setFormTitle('');
      setFormComment('');
      setFormRating(5);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden my-8">
      {/* Trustpilot Header Banner */}
      <div className="p-6 md:p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-[#00b67a] flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
              <Star className="w-8 h-8 fill-white text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold tracking-tight">Trustpilot</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-medium border border-emerald-500/30">
                  {language === 'de' ? 'Verifizierte Bewertungen' : 'Verified Reviews'}
                </span>
              </div>
              <p className="text-slate-300 text-sm mt-1">
                {language === 'de'
                  ? `Echte Kundenbewertungen für ${productName}`
                  : `Real customer reviews for ${productName}`}
              </p>
            </div>
          </div>

          {/* Overall Product Score */}
          <div className="flex items-center gap-6 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
            <div className="text-center">
              <div className="text-3xl font-extrabold text-white">{stats.average}</div>
              <div className="text-xs text-slate-300">
                {language === 'de' ? 'von 5.0 Sternen' : 'out of 5.0 stars'}
              </div>
            </div>
            <div className="h-10 w-px bg-white/20" />
            <div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div
                    key={star}
                    className={`w-6 h-6 rounded flex items-center justify-center ${
                      star <= Math.round(stats.average) ? 'bg-[#00b67a]' : 'bg-slate-700'
                    }`}
                  >
                    <Star className="w-3.5 h-3.5 fill-white text-white" />
                  </div>
                ))}
              </div>
              <div className="text-xs font-semibold text-emerald-400 mt-1">
                {stats.average >= 4.5
                  ? language === 'de'
                    ? 'Hervorragend'
                    : 'Excellent'
                  : language === 'de'
                  ? 'Sehr gut'
                  : 'Very Good'}{' '}
                ({stats.total} {language === 'de' ? 'Bewertungen' : 'Reviews'})
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Review Section: Ratings Breakdown & CTA */}
      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-8 border-b border-slate-200">
          {/* Star Distribution Bars */}
          <div className="lg:col-span-7 space-y-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
              {language === 'de' ? 'Bewertungsübersicht' : 'Rating Breakdown'}
            </h4>
            {[5, 4, 3, 2, 1].map((stars) => {
              const pct = stats.distribution[stars] || 0;
              const isSelected = selectedStarFilter === stars;
              return (
                <button
                  key={stars}
                  onClick={() => setSelectedStarFilter(isSelected ? null : stars)}
                  className={`w-full flex items-center gap-3 group text-left px-2 py-1 rounded-lg transition-colors ${
                    isSelected ? 'bg-emerald-50' : 'hover:bg-slate-50'
                  }`}
                >
                  <span className="text-xs font-medium text-slate-700 w-16">
                    {stars} {language === 'de' ? 'Sterne' : 'Stars'}
                  </span>
                  <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isSelected ? 'bg-[#00b67a]' : 'bg-emerald-500 group-hover:bg-[#00b67a]'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-slate-600 w-10 text-right">{pct}%</span>
                </button>
              );
            })}
          </div>

          {/* Action Callout */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-slate-50 p-6 rounded-xl border border-slate-200">
            <div>
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-base mb-1">
                <CheckCircle className="w-5 h-5 text-[#00b67a]" />
                {language === 'de' ? 'Geprüfte Echtheit' : 'Verified Authenticity'}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {language === 'de'
                  ? 'Alle Bewertungen stammen von echten Käufern, die dieses E-Bike bei uns erworben und über Trustpilot bewertet haben. Wir löschen keine negativen Stimmen.'
                  : 'All reviews are submitted by verified customers who purchased this e-bike from us. Unbiased, unfiltered transparency.'}
              </p>
              <div className="text-xs text-slate-500 font-mono">
                Store ID: e-bike-zuverkaufen.de | TrustScore {STORE_TRUSTPILOT_INFO.score}/5.0 ({STORE_TRUSTPILOT_INFO.totalReviews} total)
              </div>
            </div>

            <button
              onClick={() => setIsWriteModalOpen(true)}
              className="mt-4 w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm transition-all shadow-sm cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4 text-emerald-400" />
              {language === 'de' ? 'Bewertung schreiben' : 'Write a Review'}
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {language === 'de' ? 'Filter:' : 'Filter:'}
            </span>
            <button
              onClick={() => setSelectedStarFilter(null)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                selectedStarFilter === null
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {language === 'de' ? 'Alle' : 'All'} ({productReviews.length})
            </button>
            {[5, 4, 3, 2, 1].map((stars) => (
              <button
                key={stars}
                onClick={() => setSelectedStarFilter(stars)}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                  selectedStarFilter === stars
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {stars} ★
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-500">
            {language === 'de'
              ? `Zeige ${filteredReviews.length} von ${productReviews.length} Bewertungen`
              : `Showing ${filteredReviews.length} of ${productReviews.length} reviews`}
          </div>
        </div>

        {/* Reviews List */}
        <div className="mt-6 space-y-6">
          {filteredReviews.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
              <Star className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-medium text-slate-600">
                {language === 'de'
                  ? 'Keine Bewertungen für diese Filterauswahl gefunden.'
                  : 'No reviews found for this filter selection.'}
              </p>
              <button
                onClick={() => setSelectedStarFilter(null)}
                className="mt-3 text-xs text-emerald-600 font-semibold hover:underline"
              >
                {language === 'de' ? 'Filter zurücksetzen' : 'Reset filter'}
              </button>
            </div>
          ) : (
            filteredReviews.map((review) => {
              const isHelpful = helpfulClicked[review.id];
              return (
                <div
                  key={review.id}
                  className="p-5 md:p-6 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all shadow-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                        {review.author.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-900 text-sm">{review.author}</span>
                          {review.verifiedBuyer && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              <CheckCircle className="w-3 h-3 text-[#00b67a]" />
                              {language === 'de' ? 'Verifizierter Käufer' : 'Verified Buyer'}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500">
                          {review.city}, {review.country}
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-slate-400 font-mono">{review.date}</div>
                  </div>

                  {/* Stars Badge */}
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div
                        key={star}
                        className={`w-5 h-5 rounded flex items-center justify-center ${
                          star <= review.rating ? 'bg-[#00b67a]' : 'bg-slate-200'
                        }`}
                      >
                        <Star className="w-3 h-3 fill-white text-white" />
                      </div>
                    ))}
                  </div>

                  {/* Review Text */}
                  <h5 className="font-bold text-slate-900 text-sm mb-2">
                    {language === 'de' ? review.titleDe : review.titleEn}
                  </h5>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {language === 'de' ? review.commentDe : review.commentEn}
                  </p>

                  {/* Review Footer / Helpful button */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <button
                      onClick={() => handleHelpful(review.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                        isHelpful
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      {language === 'de' ? 'Nützlich' : 'Helpful'} (
                      {review.helpfulCount + (isHelpful ? 1 : 0)})
                    </button>

                    <div className="flex items-center gap-1 text-[11px] text-slate-400">
                      <span>Trustpilot Verified Submission</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Write a Review Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsWriteModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {formSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  {language === 'de' ? 'Vielen Dank für deine Bewertung!' : 'Thank you for your review!'}
                </h3>
                <p className="text-sm text-slate-600 max-w-xs mx-auto">
                  {language === 'de'
                    ? 'Deine Bewertung wurde erfolgreich gespeichert und ist sofort online sichtbar.'
                    : 'Your review has been verified and published immediately on Trustpilot.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-6 h-6 rounded bg-[#00b67a] flex items-center justify-center text-white text-xs font-bold">
                      TP
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">
                      {language === 'de' ? 'Bewertung auf Trustpilot abgeben' : 'Submit Review on Trustpilot'}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500">
                    {language === 'de'
                      ? `Deine Erfahrung mit ${productName}`
                      : `Your real experience with ${productName}`}
                  </p>
                </div>

                {/* Rating selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {language === 'de' ? 'Deine Bewertung:' : 'Your Rating:'}
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFormRating(star)}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-transform hover:scale-110 ${
                          star <= formRating ? 'bg-[#00b67a]' : 'bg-slate-200'
                        }`}
                      >
                        <Star className="w-5 h-5 fill-white text-white" />
                      </button>
                    ))}
                    <span className="ml-2 text-sm font-semibold text-slate-700">
                      {formRating} / 5 Sterne
                    </span>
                  </div>
                </div>

                {/* Author Name & City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {language === 'de' ? 'Dein Name *' : 'Your Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formAuthor}
                      onChange={(e) => setFormAuthor(e.target.value)}
                      placeholder="z.B. Florian M."
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {language === 'de' ? 'Stadt / Ort' : 'City / Location'}
                    </label>
                    <input
                      type="text"
                      value={formCity}
                      onChange={(e) => setFormCity(e.target.value)}
                      placeholder="z.B. Köln"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Review Title */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {language === 'de' ? 'Überschrift deiner Bewertung *' : 'Review Title *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder={
                      language === 'de'
                        ? 'z.B. Fantastisches Rad für Berg und Tal'
                        : 'e.g. Fantastic performance on steep climbs'
                    }
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>

                {/* Review Body */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {language === 'de' ? 'Dein Erfahrungsbericht *' : 'Detailed Review *'}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formComment}
                    onChange={(e) => setFormComment(e.target.value)}
                    placeholder={
                      language === 'de'
                        ? 'Beschreibe Fahrverhalten, Motorunterstützung, Reichweite und Montage...'
                        : 'Describe ride feel, motor assist, battery range, and delivery condition...'
                    }
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsWriteModalOpen(false)}
                    className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  >
                    {language === 'de' ? 'Abbrechen' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 text-sm font-semibold text-white bg-[#00b67a] hover:bg-[#009b68] rounded-lg shadow-sm transition-all cursor-pointer"
                  >
                    {language === 'de' ? 'Bewertung veröffentlichen' : 'Publish Review'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
