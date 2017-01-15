﻿using StockExchange.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StockExchange.DataAccess.IRepositories
{
    public interface IPriceRepository : IRepository<Price>
    {
        Task<IList<Price>> GetCurrentPrices(int days);
        Task<IList<Price>> GetCurrentPrices(IList<int> companyIds);
        Task<Dictionary<Company, List<Price>>> GetPrices(IList<int> companyIds);
        Task<IList<Price>> GetPrices(int companyId, DateTime endDate);
        Task<DateTime> GetMaxDate();
        Task<IList<DateTime>> GetTwoMaxDates();
        Task<List<Price>> GetPricesForDates(IList<DateTime> dates);

    }
}