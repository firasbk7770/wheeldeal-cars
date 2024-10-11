import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../main/Features/icon/icon';

const Pagination = ({ totalPages, currentPage = 1, setPage }) => {
  const [active, setActive] = useState({
    left: currentPage === 1 ? "#959595" : "#0E0E0E",
    right: currentPage === totalPages ? "#959595" : "#0E0E0E",
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setPage(page);
    }
  };

  const renderButtons = () => {
    const visiblePages = [];

    if (totalPages <= (isMobile ? 4 : 7)) {
      // If total pages fit within the display limit, show all pages
      for (let i = 1; i <= totalPages; i++) {
        visiblePages.push(i);
      }
    } else {
      visiblePages.push(1); // Always show the first page

      if (currentPage > 3) visiblePages.push('...'); // Add ellipsis before current page if necessary

      // Show a range of 3 pages around the current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        visiblePages.push(i);
      }

      if (currentPage < totalPages - 2) visiblePages.push('...'); // Add ellipsis after current page if necessary

      if(totalPages && totalPages !== undefined) {
        visiblePages.push(totalPages); // Always show the last page
      }
    }
    return visiblePages.map((page, index) => {
      if (page === '...') {
        return <span key={`ellipsis-${index}`} className="mx-2">...</span>;
      }

      return (
        <button
          key={page}
          type="button"
          onClick={() => handlePageChange(page)}
          className={`w-[32px] h-[32px] rounded-full ${currentPage === page ? 'bg-black text-white' : 'bg-lightgray text-black hover:bg-black hover:text-white'} flex justify-center items-center transition-all duration-300`}
        >
          {page}
        </button>
      );
    });
  };

  return (
    <div className="mt-[5%] w-full flex justify-center">
      <div className="gap-3 flex items-center justify-start lg:ml-0 -ml-5">
        {/* Left Arrow (Previous Page) */}
        <motion.div
          className={`bg-lightgray w-[32px] h-[32px] flex justify-center items-center rounded-full featureLeftIcon transition-all duration-300 ${currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          onClick={() => handlePageChange(currentPage - 1)}
          onHoverStart={() => {
            setActive({ left: currentPage === 1 ? "#959595" : "#fff", right: active.right });
          }}
          onHoverEnd={() => {
            setActive({ left: currentPage === 1 ? "#959595" : "#0E0E0E", right: active.right });
          }}
        >
          <div className="featureLeftIconInner transition-all duration-200">
            <Icon color={active.left} />
          </div>
          <div className="featureLeftLine transition-all duration-200 absolute"></div>
        </motion.div>

        {renderButtons()}

        {/* Right Arrow (Next Page) */}
        <motion.div
          className={`bg-lightgray w-[32px] h-[32px] flex justify-center items-center rounded-full featureLeftIcon transition-all duration-300 ${currentPage === totalPages ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          onClick={() => handlePageChange(currentPage + 1)}
          onHoverStart={() => {
            setActive({ left: active.left, right: currentPage === totalPages ? "#959595" : "#fff" });
          }}
          onHoverEnd={() => {
            setActive({ left: active.left, right: currentPage === totalPages ? "#959595" : "#0E0E0E" });
          }}
        >
          <div className="rotate-180 transition-all duration-200 featureRightInner">
            <Icon color={active.right} />
          </div>
          <div className="featureLeftLine transition-all duration-200 absolute"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default Pagination;
