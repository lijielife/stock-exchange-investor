﻿using StockExchange.DataAccess.IRepositories;
using StockExchange.DataAccess.Models;
using StockExchange.DataAccess.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StockExchange.Business.Indicators
{
    public abstract class BaseIndicator : IAutoIndicator
    {
        private readonly IRepository<Price> _priceRepository;
        protected BaseIndicator(IRepository<Price> priceRepository)
        {
            _priceRepository = priceRepository;
        }

        protected BaseIndicator()
        {
            _priceRepository = new GenericRepository<Price>();
        }

        public abstract IList<decimal> Calculate(IList<Price> historicalPrices);

        public IList<decimal> Calculate(DateTime startDate, DateTime endDate)
        {
            var prices = _priceRepository.GetQueryable(p => p.Date >= startDate && p.Date <= endDate).ToList();
            return Calculate(prices);
        }
    }
}