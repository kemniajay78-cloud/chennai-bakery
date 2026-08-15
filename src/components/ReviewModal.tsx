import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Star, Send, Heart, Sparkles } from 'lucide-react';
import { CHENNAI_AREAS } from '../data/bakeryData';
import { toast } from 'sonner';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [area, setArea] = useState(CHENNAI_AREAS[0].split('(')[0].trim());
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [favItem, setFavItem] = useState('Classic Madras Honey Cake');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) {
      toast.error('Please fill your name and review message');
      return;
    }

    toast.success('❤️ Nandri for your lovely review!', {
      description: 'Your feedback will be featured on the Chennai Bakery community wall.'
    });

    setName('');
    setComment('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white p-0 rounded-3xl overflow-hidden border border-amber-100 shadow-2xl">
        <div className="bg-gradient-to-r from-amber-600 via-rose-600 to-amber-600 text-white p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black font-serif flex items-center gap-2">
              <Heart className="w-6 h-6 fill-rose-300 text-rose-300" />
              <span>Share Your Bakery Story</span>
            </DialogTitle>
            <p className="text-xs text-amber-100">
              Tell us how you enjoyed our Honey Cake, Hot Puffs or Biscuits!
            </p>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="font-bold text-amber-950 block mb-1">Your Rating *</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 text-2xl focus:outline-none transition-transform hover:scale-125"
                >
                  <Star
                    className={`w-7 h-7 ${
                      star <= rating ? 'fill-amber-400 text-amber-400' : 'text-amber-200'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-amber-950 block mb-1">Your Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Swetha S."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 bg-amber-50/50 border border-amber-200 rounded-xl font-medium"
              />
            </div>
            <div>
              <label className="font-bold text-amber-950 block mb-1">Chennai Area *</label>
              <input
                type="text"
                placeholder="e.g. Mylapore / Adyar"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full p-2.5 bg-amber-50/50 border border-amber-200 rounded-xl font-medium"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-amber-950 block mb-1">Favorite Item</label>
            <select
              value={favItem}
              onChange={(e) => setFavItem(e.target.value)}
              className="w-full p-2.5 bg-amber-50/50 border border-amber-200 rounded-xl font-semibold"
            >
              <option>Classic Madras Honey Cake</option>
              <option>Chennai Degree Filter Coffee Cake</option>
              <option>Madras Spiced Veg Puff</option>
              <option>Chettinad Egg Pepper Puff</option>
              <option>Mylapore Butter Biscuits</option>
              <option>Daily Fresh Milk Bread</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-amber-950 block mb-1">Your Experience / Review *</label>
            <textarea
              rows={3}
              required
              placeholder="What made your tea-time or celebration special?..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2.5 bg-amber-50/50 border border-amber-200 rounded-xl"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-600 via-rose-600 to-amber-600 hover:from-amber-700 hover:to-rose-700 text-white font-extrabold py-3 rounded-2xl shadow-md text-xs"
          >
            <Send className="w-4 h-4 mr-1.5" />
            Submit Review
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};